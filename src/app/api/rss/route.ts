import { NextRequest, NextResponse } from 'next/server'
import { NewsAPI } from '@/lib/api/news'
import { rateLimiters, getClientIP } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimiters.api(clientIP)

    if (!rateLimitResult.success) {
      return new NextResponse('Too many requests. Please try again later.', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
        }
      })
    }
    // Fetch recent published news
    const newsResponse = await NewsAPI.getNews({ published: true }, 1, 20)
    const news = newsResponse.data

    // Generate RSS XML
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>High School Soap Lab - 最新消息</title>
    <description>High School Soap Lab 的最新動態、活動消息和重要公告</description>
    <link>${process.env.NEXT_PUBLIC_SITE_URL || 'https://hssl.vercel.app'}/news</link>
    <language>zh-TW</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://hssl.vercel.app'}/api/rss" rel="self" type="application/rss+xml"/>
    <generator>High School Soap Lab News System</generator>
    <image>
      <url>${process.env.NEXT_PUBLIC_SITE_URL || 'https://hssl.vercel.app'}/hssl_profile.jpg</url>
      <title>High School Soap Lab</title>
      <link>${process.env.NEXT_PUBLIC_SITE_URL || 'https://hssl.vercel.app'}</link>
    </image>
${news.map(item => `    <item>
      <title><![CDATA[${item.title}]]></title>
      <description><![CDATA[${item.excerpt || item.content.substring(0, 200) + '...'}]]></description>
      <link>${process.env.NEXT_PUBLIC_SITE_URL || 'https://hssl.vercel.app'}/news/${item.id}</link>
      <guid isPermaLink="true">${process.env.NEXT_PUBLIC_SITE_URL || 'https://hssl.vercel.app'}/news/${item.id}</guid>
      <pubDate>${new Date(item.published_at || item.created_at).toUTCString()}</pubDate>
      <category><![CDATA[${item.category}]]></category>
      ${item.author?.full_name ? `<author>noreply@hssl.org (${item.author.full_name})</author>` : ''}
    </item>`).join('\n')}
  </channel>
</rss>`

    return new NextResponse(rssXml, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new NextResponse('Error generating RSS feed', { status: 500 })
  }
}

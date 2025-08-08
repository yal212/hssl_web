import { Resend } from 'resend'

// Lazy initialization of Resend to avoid build-time errors
let resend: Resend | null = null

function getResendInstance(): Resend {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend!
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

/**
 * Send email notification to admin when new contact message is received
 */
export async function sendAdminNotification(contactMessage: ContactMessage) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured, skipping admin notification email')
    return { success: false, error: 'Email service not configured' }
  }

  if (!process.env.ADMIN_EMAIL) {
    console.warn('ADMIN_EMAIL not configured, skipping admin notification email')
    return { success: false, error: 'Admin email not configured' }
  }

  try {
    const { data, error } = await getResendInstance().emails.send({
      from: process.env.FROM_EMAIL || 'HSSL Contact Form <noreply@yourdomain.com>',
      to: [process.env.ADMIN_EMAIL],
      subject: `新的聯絡訊息：${contactMessage.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">
            新的聯絡訊息
          </h2>
          
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #065f46;">聯絡資訊</h3>
            <p><strong>姓名：</strong> ${contactMessage.name}</p>
            <p><strong>電子郵件：</strong> ${contactMessage.email}</p>
            <p><strong>主旨：</strong> ${contactMessage.subject}</p>
            <p><strong>提交時間：</strong> ${new Date(contactMessage.created_at).toLocaleString('zh-TW')}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #d1d5db; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #374151;">訊息內容</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${contactMessage.message}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              請登入 HSSL 管理後台查看完整訊息並回覆。<br>
              訊息 ID: ${contactMessage.id}
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Failed to send admin notification:', error)
      return { success: false, error: error.message }
    }

    console.log('Admin notification sent successfully:', data?.id)
    return { success: true, messageId: data?.id }

  } catch (error) {
    console.error('Email service error:', error)
    return { success: false, error: 'Failed to send email notification' }
  }
}

/**
 * Send auto-reply confirmation email to user
 */
export async function sendAutoReply(contactMessage: ContactMessage) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured, skipping auto-reply email')
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const { data, error } = await getResendInstance().emails.send({
      from: process.env.FROM_EMAIL || 'HSSL <noreply@yourdomain.com>',
      to: [contactMessage.email],
      subject: `感謝您的聯絡 - ${contactMessage.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #059669; margin-bottom: 10px;">High School Soap Lab</h1>
            <p style="color: #6b7280; margin: 0;">感謝您與我們聯絡</p>
          </div>
          
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #065f46; margin-top: 0;">親愛的 ${contactMessage.name}，</h2>
            <p style="line-height: 1.6;">
              感謝您透過我們的網站與 High School Soap Lab 聯絡。我們已經收到您的訊息，
              我們的團隊會在 24 小時內回覆您。
            </p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #d1d5db; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #374151;">您的訊息摘要</h3>
            <p><strong>主旨：</strong> ${contactMessage.subject}</p>
            <p><strong>提交時間：</strong> ${new Date(contactMessage.created_at).toLocaleString('zh-TW')}</p>
            <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin-top: 15px;">
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${contactMessage.message}</p>
            </div>
          </div>
          
          <div style="margin-top: 30px; text-align: center;">
            <p style="color: #6b7280; margin-bottom: 20px;">
              在等待回覆的同時，歡迎關注我們的社群媒體獲得最新消息：
            </p>
            <div style="margin: 20px 0;">
              <a href="https://www.instagram.com/high.school.soap.lab" 
                 style="display: inline-block; margin: 0 10px; color: #059669; text-decoration: none;">
                📱 Instagram
              </a>
              <a href="https://www.facebook.com/groups/488135418924034/" 
                 style="display: inline-block; margin: 0 10px; color: #059669; text-decoration: none;">
                📘 Facebook
              </a>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #f9fafb; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              此為系統自動發送的確認郵件，請勿直接回覆。<br>
              如有緊急事項，請直接聯絡：official.highschoolsoaplab@gmail.com
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Failed to send auto-reply:', error)
      return { success: false, error: error.message }
    }

    console.log('Auto-reply sent successfully:', data?.id)
    return { success: true, messageId: data?.id }

  } catch (error) {
    console.error('Auto-reply email error:', error)
    return { success: false, error: 'Failed to send auto-reply email' }
  }
}

/**
 * Send custom reply email from admin
 */
export async function sendCustomReply(
  contactMessage: ContactMessage,
  replyContent: string,
  adminName: string = 'HSSL 團隊'
) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured, skipping custom reply email')
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const { data, error } = await getResendInstance().emails.send({
      from: process.env.FROM_EMAIL || 'HSSL <noreply@yourdomain.com>',
      to: [contactMessage.email],
      subject: `Re: ${contactMessage.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #059669; margin-bottom: 10px;">High School Soap Lab</h1>
            <p style="color: #6b7280; margin: 0;">回覆您的聯絡訊息</p>
          </div>
          
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #065f46; margin-top: 0;">親愛的 ${contactMessage.name}，</h2>
            <div style="white-space: pre-wrap; line-height: 1.6;">${replyContent}</div>
            <p style="margin-top: 20px; margin-bottom: 0;">
              <strong>${adminName}</strong><br>
              High School Soap Lab
            </p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #374151;">您的原始訊息：</h4>
            <p><strong>主旨：</strong> ${contactMessage.subject}</p>
            <p><strong>提交時間：</strong> ${new Date(contactMessage.created_at).toLocaleString('zh-TW')}</p>
            <div style="background-color: #ffffff; padding: 10px; border-radius: 4px; margin-top: 10px;">
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${contactMessage.message}</p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #f9fafb; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              如有其他問題，歡迎隨時與我們聯絡：official.highschoolsoaplab@gmail.com
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Failed to send custom reply:', error)
      return { success: false, error: error.message }
    }

    console.log('Custom reply sent successfully:', data?.id)
    return { success: true, messageId: data?.id }

  } catch (error) {
    console.error('Custom reply email error:', error)
    return { success: false, error: 'Failed to send custom reply email' }
  }
}

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  Mail, 
  Clock, 
  CheckCircle, 
  MessageSquare, 
  User, 
  Calendar,
  Filter,
  Search,
  Reply,
  Eye,
  EyeOff
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'unread' | 'read' | 'replied'
  admin_notes?: string
  created_at: string
  updated_at: string
}

interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
}

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  })
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [replyText, setReplyText] = useState('')
  const [isReplying, setIsReplying] = useState(false)

  const fetchMessages = async (page = 1, status = statusFilter) => {
    try {
      setLoading(true)
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        console.error('No session found')
        return
      }

      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString()
      })
      
      if (status !== 'all') {
        params.append('status', status)
      }

      const response = await fetch(`/api/admin/contact-messages?${params}`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages)
        setPagination(data.pagination)
      } else {
        console.error('Failed to fetch messages')
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateMessageStatus = async (messageId: string, status: string, adminNotes?: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        console.error('No session found')
        return
      }

      const response = await fetch('/api/admin/contact-messages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          id: messageId,
          status,
          admin_notes: adminNotes
        })
      })

      if (response.ok) {
        // Refresh messages
        fetchMessages(pagination.page, statusFilter)
        if (selectedMessage?.id === messageId) {
          setSelectedMessage(prev => prev ? { ...prev, status: status as any, admin_notes: adminNotes } : null)
        }
      } else {
        console.error('Failed to update message status')
      }
    } catch (error) {
      console.error('Error updating message status:', error)
    }
  }

  const sendReply = async () => {
    if (!selectedMessage || !replyText.trim()) return

    setIsReplying(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        console.error('No session found')
        return
      }

      const response = await fetch('/api/admin/contact-messages/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          messageId: selectedMessage.id,
          replyContent: replyText
        })
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Reply sent successfully:', result)

        // Refresh messages and update selected message
        fetchMessages(pagination.page, statusFilter)
        setSelectedMessage(prev => prev ? {
          ...prev,
          status: 'replied',
          admin_notes: replyText
        } : null)
        setReplyText('')

        // Show success message (you could add a toast notification here)
        alert('回覆已成功發送！')
      } else {
        const error = await response.json()
        console.error('Failed to send reply:', error)
        alert('發送回覆失敗，請重試。')
      }
    } catch (error) {
      console.error('Error sending reply:', error)
      alert('發送回覆時發生錯誤，請重試。')
    } finally {
      setIsReplying(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unread':
        return <Mail className="w-4 h-4 text-blue-600" />
      case 'read':
        return <Eye className="w-4 h-4 text-yellow-600" />
      case 'replied':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread':
        return 'bg-blue-50 text-blue-800 border-blue-200'
      case 'read':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200'
      case 'replied':
        return 'bg-green-50 text-green-800 border-green-200'
      default:
        return 'bg-gray-50 text-gray-800 border-gray-200'
    }
  }

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">聯絡訊息管理</h1>
          <p className="text-gray-600">查看和回覆來自網站的聯絡訊息</p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex flex-col sm:flex-row gap-4"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                fetchMessages(1, e.target.value)
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">所有狀態</option>
              <option value="unread">未讀</option>
              <option value="read">已讀</option>
              <option value="replied">已回覆</option>
            </select>
          </div>

          <div className="flex items-center gap-2 flex-1">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="搜尋姓名、電子郵件或主旨..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Messages List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Messages List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  聯絡訊息 ({pagination.total})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="p-6 text-center text-gray-500">載入中...</div>
                ) : filteredMessages.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">沒有找到訊息</div>
                ) : (
                  <div className="space-y-2">
                    {filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        onClick={() => setSelectedMessage(message)}
                        className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedMessage?.id === message.id ? 'bg-green-50 border-green-200' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(message.status)}
                            <span className="font-medium text-gray-900">{message.name}</span>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(message.status)}`}>
                            {message.status === 'unread' ? '未讀' : message.status === 'read' ? '已讀' : '已回覆'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{message.email}</p>
                        <p className="text-sm font-medium text-gray-900 mb-2">{message.subject}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(message.created_at).toLocaleString('zh-TW')}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-4 flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page === 1}
                  onClick={() => fetchMessages(pagination.page - 1, statusFilter)}
                >
                  上一頁
                </Button>
                <span className="px-3 py-2 text-sm text-gray-600">
                  第 {pagination.page} 頁，共 {pagination.totalPages} 頁
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page === pagination.totalPages}
                  onClick={() => fetchMessages(pagination.page + 1, statusFilter)}
                >
                  下一頁
                </Button>
              </div>
            )}
          </motion.div>

          {/* Message Detail */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {selectedMessage ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>訊息詳情</span>
                    <div className="flex gap-2">
                      {selectedMessage.status === 'unread' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateMessageStatus(selectedMessage.id, 'read')}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          標記已讀
                        </Button>
                      )}
                      <Button
                        size="sm"
                        onClick={() => setReplyText('')}
                      >
                        <Reply className="w-4 h-4 mr-1" />
                        回覆
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">聯絡資訊</h4>
                    <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                      <p><strong>姓名：</strong> {selectedMessage.name}</p>
                      <p><strong>電子郵件：</strong> {selectedMessage.email}</p>
                      <p><strong>主旨：</strong> {selectedMessage.subject}</p>
                      <p><strong>提交時間：</strong> {new Date(selectedMessage.created_at).toLocaleString('zh-TW')}</p>
                      <p>
                        <strong>狀態：</strong> 
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full border ${getStatusColor(selectedMessage.status)}`}>
                          {selectedMessage.status === 'unread' ? '未讀' : selectedMessage.status === 'read' ? '已讀' : '已回覆'}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">訊息內容</h4>
                    <div className="bg-white p-4 border border-gray-200 rounded-lg">
                      <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>

                  {selectedMessage.admin_notes && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">管理員備註</h4>
                      <div className="bg-yellow-50 p-3 border border-yellow-200 rounded-lg">
                        <p className="whitespace-pre-wrap">{selectedMessage.admin_notes}</p>
                      </div>
                    </div>
                  )}

                  {/* Reply Form */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">回覆訊息</h4>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="輸入回覆內容..."
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-vertical"
                    />
                    <div className="mt-3 flex gap-2">
                      <Button
                        onClick={sendReply}
                        disabled={!replyText.trim() || isReplying}
                        isLoading={isReplying}
                      >
                        <Reply className="w-4 h-4 mr-1" />
                        {isReplying ? '發送中...' : '發送回覆'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setReplyText('')}
                      >
                        清除
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>選擇一個訊息來查看詳情</p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

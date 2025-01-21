// 通知类型枚举
export const NotificationType = {
  SYSTEM: 'system',
  FEATURE: 'feature',
  UPDATE: 'update',
  MAINTENANCE: 'maintenance',
  SECURITY: 'security'
}

// 通知优先级枚举
export const NotificationPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
}

// 生成通知ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// 格式化时间
const formatTime = (date) => {
  const now = new Date()
  const diff = now - date
  
  // 一小时内
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000)
    return `${minutes}分钟前`
  }
  
  // 24小时内
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000)
    return `${hours}小时前`
  }
  
  // 超过24小时
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  
  if (year === now.getFullYear()) {
    return `${month}-${day} ${hours}:${minutes}`
  }
  
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

// 从HTML中提取纯文本
const stripHtml = (html) => {
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

class NotificationManager {
  constructor() {
    this.notifications = []
    this.subscribers = new Set()
  }

  // 添加通知
  addNotification(notification) {
    const newNotification = {
      id: generateId(),
      type: notification.type || NotificationType.SYSTEM,
      priority: notification.priority || NotificationPriority.MEDIUM,
      title: notification.title,
      content: notification.content,
      preview: notification.preview || stripHtml(notification.content).substring(0, 50) + '...',
      read: false,
      createdAt: new Date(),
      time: formatTime(new Date())
    }

    this.notifications.unshift(newNotification)
    this._notifySubscribers()
    
    return newNotification.id
  }

  // 标记通知为已读
  markAsRead(notificationId) {
    const notification = this.notifications.find(n => n.id === notificationId)
    if (notification) {
      notification.read = true
      this._notifySubscribers()
    }
  }

  // 标记所有通知为已读
  markAllAsRead() {
    this.notifications.forEach(notification => {
      notification.read = true
    })
    this._notifySubscribers()
  }

  // 删除通知
  removeNotification(notificationId) {
    const index = this.notifications.findIndex(n => n.id === notificationId)
    if (index !== -1) {
      this.notifications.splice(index, 1)
      this._notifySubscribers()
    }
  }

  // 获取所有通知
  getNotifications() {
    return this.notifications
  }

  // 获取未读通知数量
  getUnreadCount() {
    return this.notifications.filter(n => !n.read).length
  }

  // 获取特定类型的通知
  getNotificationsByType(type) {
    return this.notifications.filter(n => n.type === type)
  }

  // 订阅通知更新
  subscribe(callback) {
    this.subscribers.add(callback)
    return () => {
      this.subscribers.delete(callback)
    }
  }

  // 通知所有订阅者
  _notifySubscribers() {
    this.subscribers.forEach(callback => {
      callback(this.notifications)
    })
  }
}

// 创建单例实例
export const notificationManager = new NotificationManager()

// 添加一些初始通知
notificationManager.addNotification({
  type: NotificationType.SECURITY,
  priority: NotificationPriority.HIGH,
  title: '账号安全提醒',
  content: `
    <p>亲爱的用户：</p>
    <p>为了保障你的账号安全，请注意：</p>
    <ul>
      <li>定期更换密码</li>
      <li>不要将账号密码告诉他人</li>
      <li>不要点击来源不明的链接</li>
      <li>及时更新客户端版本</li>
    </ul>
    <p>如发现账号异常，请立即联系客服。</p>
  `
})

notificationManager.addNotification({
  type: NotificationType.UPDATE,
  priority: NotificationPriority.MEDIUM,
  title: '系统更新公告',
  content: `
    <p>亲爱的用户：</p>
    <p>我们将于2025年1月25日凌晨2:00-4:00进行系统升级维护，期间可能出现短暂服务中断。</p>
    <p>本次更新内容：</p>
    <ul>
      <li>优化系统性能</li>
      <li>提升用户体验</li>
      <li>修复已知问题</li>
    </ul>
    <p>感谢你的理解与支持！</p>
  `
})

notificationManager.addNotification({
  type: NotificationType.FEATURE,
  priority: NotificationPriority.MEDIUM,
  title: '新功能上线：简历管理',
  content: `
    <p>我们很高兴地通知你，简历管理功能已经上线！</p>
    <p>新功能包括：</p>
    <ul>
      <li>专业的简历模板</li>
      <li>在线编辑和预览</li>
      <li>一键导出PDF</li>
      <li>多份简历管理</li>
    </ul>
    <p>快去创建你的第一份简历吧！</p>
  `
})

notificationManager.addNotification({
  type: NotificationType.SYSTEM,
  priority: NotificationPriority.HIGH,
  title: '欢迎使用互成一家',
  content: `
    <p>亲爱的同学：</p>
    <p>欢迎加入互成一家！这里是一个充满温暖和互助精神的校园社区。</p>
    <p>在这里，你可以：</p>
    <ul>
      <li>参与互助学习，提升学习效率</li>
      <li>获取校招信息，开启职业生涯</li>
      <li>结识志同道合的朋友</li>
    </ul>
    <p>希望你能在这里收获成长与快乐！</p>
  `
})

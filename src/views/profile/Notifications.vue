<template>
  <div class="notifications-view">
    <AppHeader title="系统通知" />
    
    <div class="content">
      <!-- 通知列表 -->
      <div class="notification-list">
        <div 
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-item"
          :class="{ unread: !notification.read }"
          @click="markAsRead(notification)"
        >
          <div class="notification-icon" :class="notification.type">
            <component :is="getIcon(notification.type)" />
          </div>
          
          <div class="notification-content">
            <div class="notification-title">{{ notification.title }}</div>
            <div class="notification-message">{{ notification.message }}</div>
            <div class="notification-time">{{ formatTime(notification.time) }}</div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="notifications.length === 0" class="empty-state">
        <Bell class="empty-icon" />
        <p>暂无通知</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  Bell, MessageSquare, UserPlus, CheckCircle, 
  AlertCircle, Calendar
} from 'lucide-vue-next'
import AppHeader from '../../components/common/AppHeader.vue'

// 模拟数据
const notifications = ref([
  {
    id: 1,
    type: 'application',
    title: '互助申请通过',
    message: '你申请加入的"前端项目结对编程"互助已通过',
    time: '2024-01-21 20:30',
    read: false
  },
  {
    id: 2,
    type: 'message',
    title: '新消息提醒',
    message: '张同学给你发送了一条消息',
    time: '2024-01-21 18:45',
    read: false
  },
  {
    id: 3,
    type: 'system',
    title: '系统通知',
    message: '你的简历已获得3次新的浏览',
    time: '2024-01-21 15:20',
    read: true
  },
  {
    id: 4,
    type: 'reminder',
    title: '学习提醒',
    message: '今天晚上8点有算法学习小组活动',
    time: '2024-01-21 14:30',
    read: true
  }
])

// 根据通知类型获取图标
const getIcon = (type) => {
  const iconMap = {
    application: UserPlus,
    message: MessageSquare,
    system: Bell,
    reminder: Calendar,
    success: CheckCircle,
    warning: AlertCircle
  }
  return iconMap[type] || Bell
}

// 格式化时间
const formatTime = (time) => {
  const date = new Date(time)
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

// 标记通知为已读
const markAsRead = (notification) => {
  if (!notification.read) {
    notification.read = true
  }
}
</script>

<style scoped>
.notifications-view {
  min-height: 100vh;
  background: #f5f5f5;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.notification-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.notification-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: white;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.notification-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.notification-item.unread {
  background: #f0f9ff;
}

.notification-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: #f5f5f5;
}

.notification-icon svg {
  width: 20px;
  height: 20px;
  color: #666;
}

/* 不同类型的图标颜色 */
.notification-icon.application {
  background: #e3f2fd;
}
.notification-icon.application svg {
  color: #1976d2;
}

.notification-icon.message {
  background: #e8f5e9;
}
.notification-icon.message svg {
  color: #2e7d32;
}

.notification-icon.system {
  background: #fff3e0;
}
.notification-icon.system svg {
  color: #ef6c00;
}

.notification-icon.reminder {
  background: #f3e5f5;
}
.notification-icon.reminder svg {
  color: #7b1fa2;
}

.notification-content {
  flex: 1;
}

.notification-title {
  margin-bottom: 4px;
  font-size: 15px;
  color: #333;
  font-weight: 500;
}

.notification-message {
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.notification-time {
  font-size: 12px;
  color: #999;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  color: #999;
}

.empty-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  color: #ccc;
}

@media (max-width: 768px) {
  .content {
    padding: 12px;
  }

  .notification-item {
    padding: 12px;
  }
}
</style>

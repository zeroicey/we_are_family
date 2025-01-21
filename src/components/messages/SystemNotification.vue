<template>
  <div class="system-notification">
    <div class="notification-header">
      <div class="header-left">
        <h3>系统通知</h3>
        <span class="unread-count" v-if="unreadCount > 0">{{ unreadCount }}</span>
      </div>
      <button 
        class="mark-all-btn"
        v-if="unreadCount > 0"
        @click="handleMarkAllRead"
      >
        全部已读
      </button>
    </div>

    <div class="notification-list">
      <div 
        v-for="notification in notifications" 
        :key="notification.id"
        class="notification-item"
        :class="{ 
          unread: !notification.read,
          [notification.priority]: true,
          [notification.type]: true
        }"
        @click="handleNotificationClick(notification)"
      >
        <div class="notification-icon">
          <component :is="getIcon(notification.type)" />
        </div>

        <div class="notification-content">
          <div class="notification-title">
            <h4>{{ notification.title }}</h4>
            <span 
              v-if="!notification.read" 
              class="unread-dot"
            ></span>
          </div>
          <p class="notification-preview">{{ notification.preview }}</p>
          <span class="notification-time">{{ notification.time }}</span>
        </div>
      </div>

      <div v-if="notifications.length === 0" class="empty-state">
        <Bell class="empty-icon" />
        <p>暂无系统通知</p>
      </div>
    </div>

    <!-- 通知详情对话框 -->
    <ActionDialog
      v-model:visible="showDetailDialog"
      :title="selectedNotification?.title"
      :show-footer="false"
      width="600px"
    >
      <div class="notification-detail" v-if="selectedNotification">
        <div class="detail-header">
          <div 
            class="detail-icon"
            :class="selectedNotification.type"
          >
            <component :is="getIcon(selectedNotification.type)" />
          </div>
          <div class="detail-info">
            <h3>{{ selectedNotification.title }}</h3>
            <span class="detail-time">{{ selectedNotification.time }}</span>
          </div>
        </div>
        <div 
          class="detail-content"
          v-html="selectedNotification.content"
        ></div>
      </div>
    </ActionDialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { 
  Bell, AlertTriangle, Zap, 
  Settings, Shield 
} from 'lucide-vue-next'
import ActionDialog from '../common/ActionDialog.vue'
import { 
  notificationManager,
  NotificationType
} from '../../utils/notification'

const notifications = ref([])
const showDetailDialog = ref(false)
const selectedNotification = ref(null)

// 获取通知图标
const getIcon = (type) => {
  const icons = {
    [NotificationType.SYSTEM]: Bell,
    [NotificationType.FEATURE]: Zap,
    [NotificationType.UPDATE]: Settings,
    [NotificationType.MAINTENANCE]: AlertTriangle,
    [NotificationType.SECURITY]: Shield
  }
  return icons[type] || Bell
}

// 未读通知数量
const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

// 订阅通知更新
let unsubscribe
onMounted(() => {
  // 初始化通知列表
  notifications.value = notificationManager.getNotifications()
  
  // 订阅更新
  unsubscribe = notificationManager.subscribe(updatedNotifications => {
    notifications.value = updatedNotifications
  })
})

// 取消订阅
onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe()
  }
})

// 点击通知
const handleNotificationClick = (notification) => {
  selectedNotification.value = notification
  showDetailDialog.value = true
  
  // 标记为已读
  if (!notification.read) {
    notificationManager.markAsRead(notification.id)
  }
}

// 全部标记为已读
const handleMarkAllRead = () => {
  notificationManager.markAllAsRead()
}
</script>

<style scoped>
.system-notification {
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-left h3 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.unread-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 10px;
  background: #ff4d4f;
  color: white;
  font-size: 12px;
}

.mark-all-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background: #f5f5f5;
  color: #666;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mark-all-btn:hover {
  background: #e6e6e6;
}

.notification-list {
  max-height: 600px;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  gap: 16px;
  padding: 16px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.notification-item:hover {
  background: #f9f9f9;
}

.notification-item:not(:last-child) {
  border-bottom: 1px solid #f0f0f0;
}

.notification-item.unread {
  background: #f0f7ff;
}

.notification-item.unread:hover {
  background: #e6f0ff;
}

.notification-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  flex-shrink: 0;
}

/* 通知类型样式 */
.notification-item.system .notification-icon {
  background: #fff0f6;
  color: #eb2f96;
}

.notification-item.feature .notification-icon {
  background: #f6ffed;
  color: #52c41a;
}

.notification-item.update .notification-icon {
  background: #e6f7ff;
  color: #1890ff;
}

.notification-item.maintenance .notification-icon {
  background: #fff7e6;
  color: #fa8c16;
}

.notification-item.security .notification-icon {
  background: #f5f0ff;
  color: #722ed1;
}

/* 优先级样式 */
.notification-item.high {
  border-left: 4px solid #ff4d4f;
}

.notification-item.medium {
  border-left: 4px solid #faad14;
}

.notification-item.low {
  border-left: 4px solid #52c41a;
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.notification-title h4 {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.unread-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ff4d4f;
}

.notification-preview {
  font-size: 12px;
  color: #666;
  margin: 0 0 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.notification-time {
  font-size: 12px;
  color: #999;
}

.empty-state {
  padding: 48px;
  text-align: center;
  color: #999;
}

.empty-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  color: #ccc;
}

.empty-state p {
  font-size: 14px;
  margin: 0;
}

/* 通知详情样式 */
.notification-detail {
  padding: 20px;
}

.detail-header {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.detail-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  flex-shrink: 0;
}

.detail-icon.system {
  background: #fff0f6;
  color: #eb2f96;
}

.detail-icon.feature {
  background: #f6ffed;
  color: #52c41a;
}

.detail-icon.update {
  background: #e6f7ff;
  color: #1890ff;
}

.detail-icon.maintenance {
  background: #fff7e6;
  color: #fa8c16;
}

.detail-icon.security {
  background: #f5f0ff;
  color: #722ed1;
}

.detail-info {
  flex: 1;
}

.detail-info h3 {
  margin: 0 0 4px;
  font-size: 18px;
  color: #333;
}

.detail-time {
  font-size: 14px;
  color: #999;
}

.detail-content {
  font-size: 14px;
  line-height: 1.6;
  color: #666;
}

.detail-content :deep(p) {
  margin: 0 0 16px;
}

.detail-content :deep(ul) {
  margin: 0 0 16px;
  padding-left: 20px;
}

.detail-content :deep(li) {
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .notification-header {
    padding: 12px 16px;
  }

  .notification-item {
    padding: 12px 16px;
  }

  .notification-icon {
    width: 32px;
    height: 32px;
  }

  .notification-title h4 {
    font-size: 13px;
  }

  .notification-preview {
    font-size: 11px;
  }

  .notification-detail {
    padding: 16px;
  }

  .detail-icon {
    width: 40px;
    height: 40px;
  }

  .detail-info h3 {
    font-size: 16px;
  }
}
</style>

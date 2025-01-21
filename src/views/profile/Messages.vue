<template>
  <div class="messages-view">
    <AppHeader title="消息中心" />
    
    <div class="content">
      <div class="filters">
        <button 
          v-for="tab in tabs"
          :key="tab.value"
          class="filter-btn"
          :class="{ active: currentTab === tab.value }"
          @click="currentTab = tab.value"
        >
          {{ tab.label }}
          <span v-if="getUnreadCount(tab.value)" class="unread-badge">
            {{ getUnreadCount(tab.value) }}
          </span>
        </button>
      </div>

      <div class="message-container">
        <!-- 系统通知 -->
        <SystemNotification v-if="currentTab === 'system'" />

        <!-- 其他类型消息 -->
        <MessageList
          v-else
          :messages="filteredMessages"
          @select="handleSelect"
        />
      </div>
    </div>

    <!-- 消息详情对话框 -->
    <ActionDialog
      v-model:visible="showDetailDialog"
      :title="selectedMessage?.title"
      :show-footer="false"
      width="600px"
    >
      <div class="message-detail" v-if="selectedMessage">
        <div class="detail-header">
          <div class="detail-icon" :class="selectedMessage.type">
            <component :is="getIcon(selectedMessage.type)" />
          </div>
          <div class="detail-info">
            <h3>{{ selectedMessage.title }}</h3>
            <span class="detail-time">{{ selectedMessage.time }}</span>
          </div>
        </div>
        <div class="detail-content" v-html="selectedMessage.content"></div>
      </div>
    </ActionDialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  Bell, MessageSquare, Users, Briefcase, 
  CheckCircle, AlertCircle 
} from 'lucide-vue-next'
import AppHeader from '../../components/common/AppHeader.vue'
import MessageList from '../../components/messages/MessageList.vue'
import SystemNotification from '../../components/messages/SystemNotification.vue'
import ActionDialog from '../../components/common/ActionDialog.vue'
import { notificationManager } from '../../utils/notification'

const currentTab = ref('system')
const showDetailDialog = ref(false)
const selectedMessage = ref(null)

const tabs = [
  { label: '系统通知', value: 'system' },
  { label: '互助消息', value: 'help' },
  { label: '求职消息', value: 'job' }
]

// 模拟消息数据
const messages = ref([
  {
    id: 2,
    type: 'job',
    title: '字节跳动校招已查看你的简历',
    preview: '你投递的前端开发工程师岗位简历已被查看，请保持手机畅通...',
    content: `
      <p>你好！</p>
      <p>你投递的<strong>字节跳动-前端开发工程师</strong>岗位简历已被查看。</p>
      <p>请保持手机畅通，我们的HR可能会在近期与你联系。</p>
      <p>同时建议你：</p>
      <ul>
        <li>完善你的项目经历</li>
        <li>准备面试相关问题</li>
        <li>关注招聘动态</li>
      </ul>
      <p>祝你求职顺利！</p>
    `,
    time: '2024-01-21 15:30',
    read: false
  },
  {
    id: 3,
    type: 'help',
    title: '张同学申请与你结对学习',
    preview: '张同学希望和你一起学习算法，时间：每周二、四晚上...',
    content: `
      <p>你好！</p>
      <p>张同学申请与你结对学习，具体信息如下：</p>
      <ul>
        <li>学习内容：算法与数据结构</li>
        <li>时间安排：每周二、四晚上</li>
        <li>学习目标：准备实习面试</li>
      </ul>
      <p>如果你感兴趣，可以点击确认开始互助学习。</p>
    `,
    time: '2024-01-21 16:45',
    read: false
  }
])

const filteredMessages = computed(() => {
  return messages.value.filter(msg => msg.type === currentTab.value)
})

const getUnreadCount = (type) => {
  if (type === 'system') {
    return notificationManager.getUnreadCount()
  }
  return messages.value.filter(msg => msg.type === type && !msg.read).length
}

const getIcon = (type) => {
  const icons = {
    system: Bell,
    chat: MessageSquare,
    help: Users,
    job: Briefcase,
    success: CheckCircle,
    warning: AlertCircle
  }
  return icons[type] || Bell
}

const handleSelect = (message) => {
  selectedMessage.value = message
  showDetailDialog.value = true
  
  // 标记为已读
  if (!message.read) {
    const index = messages.value.findIndex(msg => msg.id === message.id)
    if (index !== -1) {
      messages.value[index].read = true
    }
  }
}
</script>

<style scoped>
.messages-view {
  min-height: 100vh;
  background: #f5f5f5;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.filters {
  display: flex;
  gap: 12px;
  padding: 16px;
  margin-bottom: 20px;
  background: white;
  border-radius: 12px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border: none;
  border-radius: 16px;
  background: #f5f5f5;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.filter-btn:hover {
  background: #e6e6e6;
}

.filter-btn.active {
  background: #07C160;
  color: white;
}

.unread-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 8px;
  background: #ff4d4f;
  color: white;
  font-size: 12px;
}

.filter-btn.active .unread-badge {
  background: rgba(255, 255, 255, 0.3);
}

.message-container {
  margin-top: 20px;
}

/* 消息详情样式 */
.message-detail {
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

.detail-icon.chat {
  background: #f6ffed;
  color: #52c41a;
}

.detail-icon.help {
  background: #e6f7ff;
  color: #1890ff;
}

.detail-icon.job {
  background: #f0f5ff;
  color: #2f54eb;
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

.detail-content :deep(strong) {
  color: #333;
  font-weight: 500;
}

@media (max-width: 768px) {
  .content {
    padding: 12px;
  }

  .filters {
    padding: 12px;
    margin-bottom: 12px;
  }

  .filter-btn {
    padding: 6px 12px;
    font-size: 12px;
  }

  .message-detail {
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

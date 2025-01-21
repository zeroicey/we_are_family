<template>
  <div class="message-list">
    <div 
      v-for="message in messages" 
      :key="message.id"
      class="message-item"
      :class="{ unread: !message.read }"
      @click="$emit('select', message)"
    >
      <div class="message-icon" :class="message.type">
        <component :is="getIcon(message.type)" />
      </div>

      <div class="message-content">
        <div class="message-header">
          <h3 class="message-title">{{ message.title }}</h3>
          <span class="message-time">{{ message.time }}</span>
        </div>
        <p class="message-preview">{{ message.preview }}</p>
      </div>
    </div>

    <div v-if="messages.length === 0" class="empty-state">
      <MessageSquare class="empty-icon" />
      <p>暂无消息</p>
    </div>
  </div>
</template>

<script setup>
import { 
  Bell, MessageSquare, Users, Briefcase, 
  CheckCircle, AlertCircle 
} from 'lucide-vue-next'

const props = defineProps({
  messages: {
    type: Array,
    required: true
  }
})

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
</script>

<style scoped>
.message-list {
  display: flex;
  flex-direction: column;
}

.message-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.message-item:hover {
  background: #f9f9f9;
}

.message-item:not(:last-child) {
  border-bottom: 1px solid #f0f0f0;
}

.message-item.unread {
  background: #f0f7ff;
}

.message-item.unread:hover {
  background: #e6f0ff;
}

.message-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  flex-shrink: 0;
}

.message-icon.system {
  background: #fff0f6;
  color: #eb2f96;
}

.message-icon.chat {
  background: #f6ffed;
  color: #52c41a;
}

.message-icon.help {
  background: #e6f7ff;
  color: #1890ff;
}

.message-icon.job {
  background: #f0f5ff;
  color: #2f54eb;
}

.message-icon.success {
  background: #f6ffed;
  color: #52c41a;
}

.message-icon.warning {
  background: #fff7e6;
  color: #fa8c16;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
}

.message-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0;
}

.message-time {
  font-size: 12px;
  color: #999;
  white-space: nowrap;
  margin-left: 8px;
}

.message-preview {
  font-size: 14px;
  color: #666;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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

@media (max-width: 768px) {
  .message-item {
    padding: 12px;
  }

  .message-icon {
    width: 32px;
    height: 32px;
  }

  .message-title {
    font-size: 14px;
  }

  .message-preview {
    font-size: 12px;
  }
}
</style>

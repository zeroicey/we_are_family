<template>
  <ActionDialog
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    title="互助详情"
    :show-cancel="true"
    cancel-text="关闭"
    confirm-text="申请加入"
    @confirm="handleApply"
  >
    <div class="help-detail">
      <!-- 创建者信息 -->
      <div class="creator-section">
        <img :src="data.creator.avatar" :alt="data.creator.name" class="avatar" />
        <div class="creator-info">
          <span class="creator-name">{{ data.creator.name }}</span>
          <span class="creator-school">{{ data.creator.school }} · {{ data.creator.major }}</span>
        </div>
      </div>

      <!-- 标题和描述 -->
      <div class="content-section">
        <h3 class="title">{{ data.title }}</h3>
        <p class="description">{{ data.description }}</p>
        
        <div class="tags">
          <span 
            v-for="tag in data.tags" 
            :key="tag"
            class="tag"
          >
            {{ getTagLabel(tag) }}
          </span>
        </div>
      </div>

      <!-- 详细信息 -->
      <div class="info-section">
        <div class="info-item">
          <Calendar class="info-icon" />
          <div class="info-content">
            <span class="info-label">学习频率</span>
            <span class="info-value">{{ data.schedule.frequency }}</span>
          </div>
        </div>

        <div class="info-item">
          <Clock class="info-icon" />
          <div class="info-content">
            <span class="info-label">时间段</span>
            <span class="info-value">{{ data.schedule.timeSlot }}</span>
          </div>
        </div>

        <div class="info-item">
          <CalendarClock class="info-icon" />
          <div class="info-content">
            <span class="info-label">持续时间</span>
            <span class="info-value">{{ data.duration }}</span>
          </div>
        </div>

        <div class="info-item">
          <Users class="info-icon" />
          <div class="info-content">
            <span class="info-label">成员人数</span>
            <span class="info-value">{{ data.currentMembers }}/{{ data.memberLimit }}人</span>
          </div>
        </div>

        <div class="info-item">
          <Clock class="info-icon" />
          <div class="info-content">
            <span class="info-label">发布时间</span>
            <span class="info-value">{{ formatTime(data.createdAt) }}</span>
          </div>
        </div>
      </div>

      <!-- 申请说明 -->
      <div class="apply-section" v-if="showApplyForm">
        <h4>申请说明</h4>
        <textarea
          v-model="applyMessage"
          placeholder="简单介绍一下自己，说说为什么想加入..."
          rows="4"
          maxlength="200"
        ></textarea>
        <span class="input-count">{{ applyMessage.length }}/200</span>
      </div>
    </div>
  </ActionDialog>
</template>

<script setup>
import { ref } from 'vue'
import { Calendar, Clock, CalendarClock, Users } from 'lucide-vue-next'
import ActionDialog from '../common/ActionDialog.vue'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:visible', 'apply'])

const showApplyForm = ref(true)
const applyMessage = ref('')

// 标签映射
const tagMap = {
  algorithm: '算法',
  frontend: '前端',
  backend: '后端',
  interview: '面试',
  project: '项目',
  english: '英语'
}

// 获取标签文本
const getTagLabel = (tag) => {
  return tagMap[tag] || tag
}

// 格式化时间
const formatTime = (time) => {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

// 提交申请
const handleApply = () => {
  if (applyMessage.value.length < 20) return
  emit('apply', {
    helpId: props.data.id,
    message: applyMessage.value
  })
  applyMessage.value = ''
}
</script>

<style scoped>
.help-detail {
  padding: 0 12px;
}

.creator-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  object-fit: cover;
}

.creator-info {
  display: flex;
  flex-direction: column;
}

.creator-name {
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.creator-school {
  font-size: 14px;
  color: #999;
}

.content-section {
  margin-bottom: 24px;
}

.title {
  margin: 0 0 12px;
  font-size: 18px;
  color: #333;
}

.description {
  margin: 0 0 16px;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 4px 8px;
  border-radius: 4px;
  background: #f5f5f5;
  color: #666;
  font-size: 12px;
}

.info-section {
  display: grid;
  gap: 16px;
  margin-bottom: 24px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.info-icon {
  width: 20px;
  height: 20px;
  color: #999;
}

.info-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-label {
  font-size: 14px;
  color: #666;
}

.info-value {
  font-size: 14px;
  color: #333;
}

.apply-section {
  border-top: 1px solid #f0f0f0;
  padding-top: 20px;
}

.apply-section h4 {
  margin: 0 0 12px;
  font-size: 16px;
  color: #333;
}

textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  resize: vertical;
  min-height: 100px;
}

.input-count {
  display: block;
  text-align: right;
  margin-top: 4px;
  font-size: 12px;
  color: #999;
}

@media (max-width: 768px) {
  .help-detail {
    padding: 0 8px;
  }
}
</style>

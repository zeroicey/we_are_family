<template>
  <div class="help-card" @click="$emit('click')">
    <div class="card-header">
      <div class="creator-info">
        <img :src="data.creator.avatar" :alt="data.creator.name" class="avatar" />
        <div class="creator-detail">
          <span class="creator-name">{{ data.creator.name }}</span>
          <span class="creator-school">{{ data.creator.school }} · {{ data.creator.major }}</span>
        </div>
      </div>
      <span class="create-time">{{ formatTime(data.createdAt) }}</span>
    </div>

    <div class="card-content">
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

    <div class="card-footer">
      <div class="schedule-info">
        <Calendar class="info-icon" />
        <span>{{ data.schedule.frequency }} {{ data.schedule.timeSlot }}</span>
      </div>
      <div class="duration-info">
        <Clock class="info-icon" />
        <span>持续{{ data.duration }}</span>
      </div>
      <div class="member-info">
        <Users class="info-icon" />
        <span>{{ data.currentMembers }}/{{ data.memberLimit }}人</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Calendar, Clock, Users } from 'lucide-vue-next'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

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
</script>

<style scoped>
.help-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.help-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.creator-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  object-fit: cover;
}

.creator-detail {
  display: flex;
  flex-direction: column;
}

.creator-name {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.creator-school {
  font-size: 12px;
  color: #999;
}

.create-time {
  font-size: 12px;
  color: #999;
}

.card-content {
  margin-bottom: 16px;
}

.title {
  margin: 0 0 8px;
  font-size: 16px;
  color: #333;
}

.description {
  margin: 0 0 12px;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
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

.card-footer {
  display: flex;
  gap: 16px;
  color: #666;
  font-size: 12px;
}

.schedule-info,
.duration-info,
.member-info {
  display: flex;
  align-items: center;
  gap: 4px;
}

.info-icon {
  width: 14px;
  height: 14px;
  color: #999;
}

@media (max-width: 768px) {
  .help-card {
    padding: 12px;
  }

  .avatar {
    width: 32px;
    height: 32px;
  }

  .card-footer {
    flex-wrap: wrap;
    gap: 12px;
  }
}
</style>

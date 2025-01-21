<template>
  <div class="activity-card">
    <div class="user-info">
      <div class="avatar">
        <img v-if="activity.userAvatar" :src="activity.userAvatar" :alt="activity.userName">
        <component v-else :is="activity.icon" class="activity-icon" />
      </div>
      <div class="user-name">{{ activity.userName }}</div>
    </div>
    <div class="activity-content">
      <h4 class="title">{{ activity.title }}</h4>
      <p class="description" :class="{ expanded: isExpanded }">
        {{ activity.description }}
      </p>
      <button 
        v-if="activity.description.length > 100" 
        class="expand-btn"
        @click="isExpanded = !isExpanded"
      >
        {{ isExpanded ? '收起' : '展开' }}
        <ChevronDown class="expand-icon" :class="{ expanded: isExpanded }" />
      </button>
      <div class="media" v-if="activity.image" @click="showPreview = true">
        <img :src="activity.image" :alt="activity.title">
        <div class="media-overlay">
          <Search class="preview-icon" />
        </div>
      </div>
      <div class="meta">
        <div class="tags">
          <span class="tag" :class="activity.category.type">
            {{ activity.category.label }}
          </span>
          <span class="tag" v-if="activity.location">
            <MapPin class="tag-icon" />
            {{ activity.location }}
          </span>
        </div>
        <div class="stats">
          <div class="stat-item">
            <MessageCircle class="stat-icon" />
            <span>{{ activity.commentCount }}</span>
          </div>
          <div class="stat-item" @click="handleLike">
            <Heart class="stat-icon" :class="{ active: activity.isLiked }" />
            <span>{{ activity.likeCount }}</span>
          </div>
        </div>
        <time class="time">{{ activity.time }}</time>
      </div>
    </div>

    <ImagePreview
      :show="showPreview"
      :src="activity.image"
      :alt="activity.title"
      @close="showPreview = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MessageCircle, Heart, MapPin, ChevronDown, Search } from 'lucide-vue-next'
import ImagePreview from '../common/ImagePreview.vue'

const props = defineProps({
  activity: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:activity'])

const isExpanded = ref(false)
const showPreview = ref(false)

const handleLike = () => {
  const updatedActivity = {
    ...props.activity,
    isLiked: !props.activity.isLiked,
    likeCount: props.activity.isLiked 
      ? props.activity.likeCount - 1 
      : props.activity.likeCount + 1
  }
  emit('update:activity', updatedActivity)
}
</script>

<style scoped>
.activity-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f5f5f5;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.activity-icon {
  width: 20px;
  height: 20px;
  color: #666;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.activity-content {
  margin-left: 52px;
}

.title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #333;
}

.description {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  transition: all 0.3s ease;
}

.description.expanded {
  -webkit-line-clamp: unset;
}

.expand-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: #07C160;
  font-size: 14px;
  padding: 4px 0;
  margin-bottom: 12px;
  cursor: pointer;
}

.expand-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

.media {
  margin-bottom: 12px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  cursor: zoom-in;
}

.media img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.media-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.media:hover .media-overlay {
  opacity: 1;
}

.media:hover img {
  transform: scale(1.05);
}

.preview-icon {
  width: 24px;
  height: 24px;
  color: white;
}

.meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.tags {
  display: flex;
  gap: 8px;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background: #f5f5f5;
  color: #666;
}

.tag.study {
  background: #E8F5E9;
  color: #2E7D32;
}

.tag.chat {
  background: #E3F2FD;
  color: #1565C0;
}

.tag.exercise {
  background: #FFF3E0;
  color: #EF6C00;
}

.tag-icon {
  width: 12px;
  height: 12px;
}

.stats {
  display: flex;
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #999;
  cursor: pointer;
  user-select: none;
}

.stat-icon {
  width: 16px;
  height: 16px;
  transition: all 0.3s ease;
}

.stat-icon.active {
  color: #FF4081;
  transform: scale(1.1);
}

.time {
  font-size: 12px;
  color: #999;
}
</style>

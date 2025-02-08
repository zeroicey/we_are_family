<template>
  <div class="activity-detail">
    <AppHeader :title="activity?.title || '动态详情'" />
    
    <div class="content" v-if="activity">
      <!-- 动态内容 -->
      <div class="activity-card">
        <div class="user-info">
          <img :src="activity.userAvatar" :alt="activity.userName" class="avatar">
          <div class="meta">
            <h3 class="username">{{ activity.userName }}</h3>
            <span class="time">{{ activity.time }}</span>
          </div>
        </div>

        <div class="activity-content">
          <h2 class="title">{{ activity.title }}</h2>
          <p class="description">{{ activity.description }}</p>
          <img 
            v-if="activity.image" 
            :src="activity.image" 
            :alt="activity.title"
            class="content-image"
          >
          
          <div class="tags">
            <span class="tag category">
              <component :is="getCategoryIcon(activity.category.type)" class="tag-icon" />
              {{ activity.category.label }}
            </span>
            <span v-if="activity.location" class="tag location">
              <MapPin class="tag-icon" />
              {{ activity.location }}
            </span>
          </div>
        </div>

        <div class="activity-actions">
          <button 
            class="action-btn"
            :class="{ active: activity.isLiked }"
            @click="handleLike"
          >
            <Heart v-if="activity.isLiked" class="action-icon" fill="currentColor" />
            <Heart v-else class="action-icon" />
            <span>{{ activity.likeCount }}</span>
          </button>
          <button class="action-btn">
            <MessageCircle class="action-icon" />
            <span>{{ activity.commentCount }}</span>
          </button>
        </div>
      </div>

      <!-- 评论区 -->
      <div class="comments-section">
        <h3 class="section-title">评论 ({{ comments.length }})</h3>
        <div class="comment-list">
          <div v-for="comment in comments" :key="comment.id" class="comment-item">
            <img :src="comment.userAvatar" :alt="comment.userName" class="comment-avatar">
            <div class="comment-content">
              <div class="comment-header">
                <span class="comment-username">{{ comment.userName }}</span>
                <span class="comment-time">{{ comment.time }}</span>
              </div>
              <p class="comment-text">{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-else-if="isLoading" class="loading">
      <ActivityCardSkeleton />
    </div>

    <!-- 评论输入框 -->
    <div class="comment-input">
      <input
        v-model="newComment"
        type="text"
        placeholder="写下你的评论..."
        @keyup.enter="handleComment"
      >
      <button class="send-btn" @click="handleComment">
        <Send class="send-icon" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { 
  Heart, MessageCircle, MapPin, Send,
  BookOpen, Coffee, Dumbbell
} from 'lucide-vue-next'
import AppHeader from '../../components/common/AppHeader.vue'
import ActivityCardSkeleton from '../../components/community/ActivityCardSkeleton.vue'

const route = useRoute()
const activityId = route.params.id

const isLoading = ref(true)
const activity = ref(null)
const comments = ref([])
const newComment = ref('')

// 获取分类图标
const getCategoryIcon = (type) => {
  const icons = {
    study: BookOpen,
    chat: Coffee,
    exercise: Dumbbell
  }
  return icons[type] || BookOpen
}

// 模拟获取动态详情
const fetchActivityDetail = async () => {
  isLoading.value = true
  try {
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟数据
    activity.value = {
      id: activityId,
      userName: '小明',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      title: '考研互助小组',
      description: '有没有准备考研的同学，一起组队互相监督呀~ 我准备考浙大计算机，最近在刷数学，找个一起学习的伙伴。每天打卡，互相分享学习进度和心得，一起进步！如果你也在准备考研，或者有相关经验，欢迎加入我们~',
      time: '10分钟前',
      category: {
        type: 'study',
        label: '学习'
      },
      location: '图书馆',
      commentCount: 5,
      likeCount: 12,
      isLiked: true,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop'
    }

    comments.value = [
      {
        id: 1,
        userName: '小红',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
        content: '我也在准备考研！一起加油呀~',
        time: '5分钟前'
      },
      {
        id: 2,
        userName: '小华',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
        content: '浙大计算机今年竞争很激烈，建议多刷刷往年真题',
        time: '3分钟前'
      }
    ]
  } catch (error) {
    console.error('Failed to fetch activity detail:', error)
  } finally {
    isLoading.value = false
  }
}

// 处理点赞
const handleLike = () => {
  if (!activity.value) return
  activity.value.isLiked = !activity.value.isLiked
  activity.value.likeCount += activity.value.isLiked ? 1 : -1
}

// 处理评论
const handleComment = () => {
  if (!newComment.value.trim()) return
  
  const comment = {
    id: comments.value.length + 1,
    userName: '我',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
    content: newComment.value,
    time: '刚刚'
  }
  
  comments.value.unshift(comment)
  activity.value.commentCount++
  newComment.value = ''
}

onMounted(() => {
  fetchActivityDetail()
})
</script>

<style scoped>
.activity-detail {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 60px;
}

.content {
  padding: 16px;
}

.activity-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 24px;
}

.meta {
  flex: 1;
}

.username {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.time {
  font-size: 14px;
  color: var(--text-tertiary);
}

.activity-content {
  margin-bottom: 16px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.description {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
  white-space: pre-wrap;
}

.content-image {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 16px;
}

.tags {
  display: flex;
  gap: 8px;
}

.tag {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 13px;
}

.tag-icon {
  width: 14px;
  height: 14px;
}

.category {
  background: #e8f5e9;
  color: #2e7d32;
}

.location {
  background: #e3f2fd;
  color: #1976d2;
}

.activity-actions {
  display: flex;
  gap: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px;
  border: none;
  background: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  color: var(--text-primary);
}

.action-btn.active {
  color: var(--primary-color);
}

.action-icon {
  width: 20px;
  height: 20px;
}

.comments-section {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comment-item {
  display: flex;
  gap: 12px;
}

.comment-avatar {
  width: 36px;
  height: 36px;
  border-radius: 18px;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.comment-username {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.comment-time {
  font-size: 12px;
  color: var(--text-tertiary);
}

.comment-text {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.comment-input {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: white;
  border-top: 1px solid var(--border-color);
}

.comment-input input {
  flex: 1;
  padding: 8px 16px;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  font-size: 14px;
  background: #f5f5f5;
}

.comment-input input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.send-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 18px;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.send-btn:hover {
  background: #06ae56;
}

.send-icon {
  width: 18px;
  height: 18px;
}

.loading {
  padding: 16px;
}
</style>

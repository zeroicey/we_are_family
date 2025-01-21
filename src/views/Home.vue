<template>
  <div class="home">
    <AppHeader title="互成一家" :show-back="false" />
    
    <PullToRefresh 
      :is-refreshing="isRefreshing"
      @refresh="handleRefresh"
    >
      <div class="content">
        <!-- 用户信息卡片 -->
        <div class="user-card">
          <div class="user-info">
            <div class="avatar">
              <User class="avatar-icon" />
            </div>
            <div class="greeting">
              <h2>{{ greeting }}</h2>
              <p>今天也要加油哦~</p>
            </div>
          </div>
          <div class="stats">
            <div class="stat-item">
              <span class="value">{{ todayFocus }}</span>
              <span class="label">今日专注</span>
            </div>
            <div class="stat-item">
              <span class="value">{{ consecutiveDays }}</span>
              <span class="label">连续打卡</span>
            </div>
            <div class="stat-item">
              <span class="value">{{ points }}</span>
              <span class="label">互助积分</span>
            </div>
          </div>
        </div>

        <!-- 功能快捷入口 -->
        <div class="quick-actions">
          <router-link to="/focus" class="action-item primary">
            <Timer class="action-icon" />
            <span class="action-label">开始专注</span>
          </router-link>
          <router-link to="/community" class="action-item">
            <Users class="action-icon" />
            <span class="action-label">寻找伙伴</span>
          </router-link>
          <router-link to="/jobs" class="action-item">
            <Briefcase class="action-icon" />
            <span class="action-label">校招信息</span>
          </router-link>
        </div>

        <!-- 今日目标 -->
        <div class="section">
          <div class="section-header">
            <h3>今日目标</h3>
            <router-link to="/plans" class="more-link">
              <span>查看全部</span>
              <ChevronRight class="more-icon" />
            </router-link>
          </div>
          <div class="goal-list">
            <template v-if="goals.length > 0">
              <div class="goal-item" v-for="goal in goals" :key="goal.id">
                <div class="goal-header">
                  <div class="goal-title">
                    <component :is="goal.icon" class="goal-icon" />
                    <h4>{{ goal.title }}</h4>
                  </div>
                  <span class="goal-time">{{ goal.time }}</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-track">
                    <div class="progress-fill" :style="{ width: `${goal.progress}%` }"></div>
                  </div>
                  <span class="progress-text">{{ goal.progress }}%</span>
                </div>
              </div>
            </template>
            <div class="empty-state" v-else>
              <Target class="empty-icon" />
              <p>还没有设置今日目标</p>
              <router-link to="/plans/create" class="add-goal-btn">
                <Plus class="btn-icon" />
                添加目标
              </router-link>
            </div>
          </div>
        </div>

        <!-- 互助动态 -->
        <div class="section">
          <div class="section-header">
            <h3>互助动态</h3>
            <router-link to="/community" class="more-link">
              <span>更多</span>
              <ChevronRight class="more-icon" />
            </router-link>
          </div>
          <ActivityList />
        </div>
      </div>
    </PullToRefresh>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppHeader from '../components/common/AppHeader.vue'
import PullToRefresh from '../components/common/PullToRefresh.vue'
import ActivityList from '../components/community/ActivityList.vue'
import { 
  User, Timer, Users, Briefcase, ChevronRight, 
  Target, Plus, BookMarked, Pencil, Dumbbell
} from 'lucide-vue-next'

// 状态
const isRefreshing = ref(false)
const todayFocus = ref(0)
const consecutiveDays = ref(0)
const points = ref(0)

// 计算问候语
const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 6) return '凌晨好！'
  if (hour < 9) return '早上好！'
  if (hour < 12) return '上午好！'
  if (hour < 14) return '中午好！'
  if (hour < 17) return '下午好！'
  if (hour < 19) return '傍晚好！'
  if (hour < 22) return '晚上好！'
  return '夜深了！'
})

// Mock goals data
const goals = ref([
  {
    id: 1,
    icon: BookMarked,
    title: '背诵单词50个',
    time: '剩余2小时',
    progress: 70
  },
  {
    id: 2,
    icon: Pencil,
    title: '完成高数作业',
    time: '剩余5小时',
    progress: 30
  },
  {
    id: 3,
    icon: Dumbbell,
    title: '健身45分钟',
    time: '已完成',
    progress: 100
  }
])

// 刷新数据
const handleRefresh = async () => {
  isRefreshing.value = true
  
  try {
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 更新数据
    todayFocus.value = Math.floor(Math.random() * 120)
    consecutiveDays.value = Math.floor(Math.random() * 7)
    points.value = Math.floor(Math.random() * 1000)
  } finally {
    isRefreshing.value = false
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: #f5f5f5;
}

.content {
  padding-bottom: 20px;
}

.user-card {
  margin: 16px;
  padding: 20px;
  background: white;
  border-radius: 12px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-icon {
  width: 24px;
  height: 24px;
  color: #999;
}

.greeting h2 {
  font-size: 20px;
  margin-bottom: 4px;
}

.greeting p {
  font-size: 14px;
  color: #666;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-item .value {
  font-size: 20px;
  font-weight: 600;
  color: #07C160;
}

.stat-item .label {
  font-size: 12px;
  color: #666;
}

.quick-actions {
  margin: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  background: white;
  border-radius: 12px;
  text-decoration: none;
  color: #666;
}

.action-item.primary {
  background: #07C160;
  color: white;
}

.action-icon {
  width: 24px;
  height: 24px;
}

.action-label {
  font-size: 14px;
}

.section {
  margin: 16px;
  padding: 20px;
  background: white;
  border-radius: 12px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.section-header h3 {
  font-size: 16px;
  font-weight: 600;
}

.more-link {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #666;
  text-decoration: none;
  font-size: 14px;
}

.more-icon {
  width: 16px;
  height: 16px;
}

.empty-state {
  padding: 32px;
  text-align: center;
  color: #666;
}

.empty-icon {
  width: 48px;
  height: 48px;
  color: #999;
  margin-bottom: 12px;
}

.empty-state p {
  margin-bottom: 16px;
  font-size: 14px;
}

.add-goal-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  background: #f5f5f5;
  border-radius: 20px;
  color: #07C160;
  text-decoration: none;
  font-size: 14px;
}

.btn-icon {
  width: 16px;
  height: 16px;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  gap: 12px;
}

.activity-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.activity-icon {
  width: 20px;
  height: 20px;
  color: #666;
}

.activity-content {
  flex: 1;
}

.activity-content h4 {
  font-size: 16px;
  margin-bottom: 4px;
}

.activity-content p {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.activity-meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #999;
}

.activity-meta .category {
  color: #07C160;
}

.goal-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.goal-item {
  background: #f8f8f8;
  border-radius: 8px;
  padding: 16px;
}

.goal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.goal-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.goal-icon {
  width: 20px;
  height: 20px;
  color: #07C160;
}

.goal-title h4 {
  font-size: 16px;
  font-weight: 500;
}

.goal-time {
  font-size: 12px;
  color: #666;
}

.progress-bar {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-track {
  flex: 1;
  height: 6px;
  background: #eee;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #07C160;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 12px;
  color: #07C160;
  min-width: 36px;
}

.empty-state {
  padding: 32px;
  text-align: center;
  color: #666;
  background: #f8f8f8;
  border-radius: 8px;
}
</style>

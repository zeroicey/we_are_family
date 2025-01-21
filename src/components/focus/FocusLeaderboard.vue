<template>
  <div class="focus-leaderboard">
    <div class="leaderboard-header">
      <h3 class="title">专注排行榜</h3>
      <div class="period-selector">
        <button 
          v-for="period in periods" 
          :key="period.value"
          class="period-btn"
          :class="{ active: selectedPeriod === period.value }"
          @click="selectedPeriod = period.value"
        >
          {{ period.label }}
        </button>
      </div>
    </div>

    <div class="leaderboard-content">
      <div 
        v-for="(user, index) in topUsers" 
        :key="user.id"
        class="user-item"
        :class="{ 'top-three': index < 3 }"
      >
        <div class="rank">
          <Award v-if="index < 3" class="medal-icon" :class="`rank-${index + 1}`" />
          <span v-else>{{ index + 1 }}</span>
        </div>
        
        <img :src="user.avatar" :alt="user.name" class="user-avatar" />
        
        <div class="user-info">
          <span class="user-name">{{ user.name }}</span>
          <span class="user-school">{{ user.school }}</span>
        </div>
        
        <div class="focus-stats">
          <span class="focus-time">{{ formatTime(user.focusMinutes) }}</span>
          <span class="focus-days">连续{{ user.streakDays }}天</span>
        </div>
      </div>
    </div>

    <div class="my-rank" v-if="myRank">
      <div class="rank">
        <span>{{ myRank.rank }}</span>
      </div>
      
      <img :src="myRank.avatar" :alt="myRank.name" class="user-avatar" />
      
      <div class="user-info">
        <span class="user-name">{{ myRank.name }}</span>
        <span class="user-school">{{ myRank.school }}</span>
      </div>
      
      <div class="focus-stats">
        <span class="focus-time">{{ formatTime(myRank.focusMinutes) }}</span>
        <span class="focus-days">连续{{ myRank.streakDays }}天</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Award } from 'lucide-vue-next'

const periods = [
  { label: '今日', value: 'today' },
  { label: '本周', value: 'week' },
  { label: '本月', value: 'month' }
]

const selectedPeriod = ref('today')

// Mock data - replace with real data later
const mockUsers = [
  {
    id: 1,
    name: '小明',
    school: '浙江大学',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    focusMinutes: 180,
    streakDays: 7
  },
  {
    id: 2,
    name: '小红',
    school: '复旦大学',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    focusMinutes: 160,
    streakDays: 5
  },
  {
    id: 3,
    name: '小强',
    school: '同济大学',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dusty',
    focusMinutes: 150,
    streakDays: 3
  },
  {
    id: 4,
    name: '小李',
    school: '上海交通大学',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Milo',
    focusMinutes: 120,
    streakDays: 4
  },
  {
    id: 5,
    name: '小张',
    school: '南京大学',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna',
    focusMinutes: 100,
    streakDays: 2
  }
]

const myRank = ref({
  rank: 8,
  name: '我',
  school: '浙江大学',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Me',
  focusMinutes: 60,
  streakDays: 1
})

const topUsers = computed(() => {
  return [...mockUsers].sort((a, b) => b.focusMinutes - a.focusMinutes)
})

const formatTime = (minutes) => {
  if (minutes < 60) {
    return `${minutes}分钟`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return remainingMinutes > 0 
    ? `${hours}小时${remainingMinutes}分钟`
    : `${hours}小时`
}
</script>

<style scoped>
.focus-leaderboard {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.leaderboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.period-selector {
  display: flex;
  gap: 8px;
}

.period-btn {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  background: #f5f5f5;
  border: none;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
}

.period-btn:hover {
  background: #e0e0e0;
}

.period-btn.active {
  background: #07C160;
  color: white;
}

.leaderboard-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.user-item:hover {
  background: #f5f5f5;
}

.user-item.top-three {
  background: #f8f8f8;
}

.rank {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #666;
}

.medal-icon {
  width: 20px;
  height: 20px;
}

.medal-icon.rank-1 {
  color: #FFD700;
}

.medal-icon.rank-2 {
  color: #C0C0C0;
}

.medal-icon.rank-3 {
  color: #CD7F32;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-name {
  font-size: 14px;
  color: #333;
}

.user-school {
  font-size: 12px;
  color: #999;
}

.focus-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.focus-time {
  font-size: 14px;
  color: #07C160;
  font-weight: 500;
}

.focus-days {
  font-size: 12px;
  color: #666;
}

.my-rank {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>

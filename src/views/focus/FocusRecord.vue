<template>
  <div class="focus-record">
    <AppHeader title="打卡记录" />

    <div class="content">
      <FilterTabs
        v-model="currentPeriod"
        :tabs="periods"
      />

      <div class="stats-section">
        <FocusStats 
          :total-focus-hours="totalFocusHours"
          :average-daily-minutes="averageDailyMinutes"
          :consecutive-days="consecutiveDays"
        />

        <TrendChart 
          :data="trendData"
          :labels="trendLabels"
        />
      </div>

      <div class="calendar-section">
        <Calendar 
          :current-month-text="currentMonthText"
          :week-days="weekDays"
          :days="calendarDays"
          @previous="previousMonth"
          @next="nextMonth"
          @select-day="showDayDetail"
        />
      </div>

      <div class="leaderboard-section">
        <FocusLeaderboard />
      </div>
    </div>

    <!-- 日期详情对话框 -->
    <ActionDialog
      :visible="showDetailDialog"
      @update:visible="showDetailDialog = $event"
      :title="selectedDay ? formatDate(selectedDay.date) : ''"
      confirm-text="关闭"
      :show-cancel="false"
    >
      <div class="day-detail" v-if="selectedDay">
        <div class="detail-header">
          <div class="detail-stat">
            <Clock class="stat-icon" />
            <div class="stat-info">
              <span class="stat-value">{{ selectedDay.focusMinutes }}分钟</span>
              <span class="stat-label">专注时长</span>
            </div>
          </div>
          <div class="detail-stat">
            <Target class="stat-icon" />
            <div class="stat-info">
              <span class="stat-value">{{ selectedDay.completedTasks }}个</span>
              <span class="stat-label">完成任务</span>
            </div>
          </div>
        </div>

        <div class="detail-list">
          <div 
            v-for="record in selectedDay.records" 
            :key="record.id"
            class="record-item"
          >
            <div class="record-time">{{ record.time }}</div>
            <div class="record-content">
              <div class="record-title">
                <component :is="record.icon" class="record-icon" />
                <span>{{ record.title }}</span>
              </div>
              <p class="record-note" v-if="record.note">{{ record.note }}</p>
            </div>
            <div class="record-duration">{{ record.duration }}分钟</div>
          </div>
        </div>
      </div>
    </ActionDialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Clock, Target, Book } from 'lucide-vue-next'
import AppHeader from '../../components/common/AppHeader.vue'
import FilterTabs from '../../components/common/FilterTabs.vue'
import Calendar from '../../components/focus/Calendar.vue'
import FocusStats from '../../components/focus/FocusStats.vue'
import TrendChart from '../../components/focus/TrendChart.vue'
import FocusLeaderboard from '../../components/focus/FocusLeaderboard.vue'
import ActionDialog from '../../components/common/ActionDialog.vue'

const weekDays = ['日', '一', '二', '三', '四', '五', '六']
const currentDate = ref(new Date())
const currentPeriod = ref('week')
const showDetailDialog = ref(false)
const selectedDay = ref(null)

const periods = [
  { label: '本周', value: 'week' },
  { label: '本月', value: 'month' }
]

// Mock data - replace with real data later
const mockFocusData = {
  '2025-01-20': {
    focusMinutes: 45,
    completedTasks: 2,
    records: [
      {
        id: 1,
        time: '09:00',
        title: '学习数学',
        icon: 'Book',
        duration: 25,
        note: '完成了高数第三章的习题'
      },
      {
        id: 2,
        time: '14:30',
        title: '写代码',
        icon: 'Code',
        duration: 20,
        note: '实现了用户注册功能'
      }
    ]
  },
  '2025-01-21': {
    focusMinutes: 30,
    completedTasks: 1,
    records: [
      {
        id: 3,
        time: '10:00',
        title: '阅读',
        icon: 'Book',
        duration: 30,
        note: '读完了第四章'
      }
    ]
  }
}

const currentMonthText = computed(() => {
  return currentDate.value.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  const days = []
  const startPadding = firstDay.getDay()
  
  // Add days from previous month
  for (let i = startPadding - 1; i >= 0; i--) {
    const date = new Date(year, month, -i)
    const dateStr = date.toISOString().split('T')[0]
    days.push({
      date: dateStr,
      dayNumber: date.getDate(),
      isCurrentMonth: false,
      ...mockFocusData[dateStr]
    })
  }
  
  // Add days from current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i)
    const dateStr = date.toISOString().split('T')[0]
    days.push({
      date: dateStr,
      dayNumber: i,
      isCurrentMonth: true,
      ...mockFocusData[dateStr]
    })
  }
  
  // Add days from next month
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i)
    const dateStr = date.toISOString().split('T')[0]
    days.push({
      date: dateStr,
      dayNumber: i,
      isCurrentMonth: false,
      ...mockFocusData[dateStr]
    })
  }
  
  return days
})

// Mock statistics - replace with real data later
const totalFocusHours = ref(24)
const averageDailyMinutes = ref(45)
const consecutiveDays = ref(3)

// Mock trend data - replace with real data later
const trendData = ref([30, 45, 60, 40, 55, 35, 50])
const trendLabels = computed(() => {
  if (currentPeriod.value === 'week') {
    return ['一', '二', '三', '四', '五', '六', '日']
  }
  return ['第1周', '第2周', '第3周', '第4周']
})

const previousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  )
}

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  )
}

const showDayDetail = (day) => {
  if (day.focusMinutes > 0) {
    selectedDay.value = mockFocusData[day.date]
    showDetailDialog.value = true
  }
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', { 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  })
}
</script>

<style scoped>
.focus-record {
  min-height: 100vh;
  background: #f5f5f5;
}

.content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stats-section,
.calendar-section,
.leaderboard-section {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.day-detail {
  padding: 0 12px;
}

.detail-header {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.detail-stat {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-icon {
  width: 32px;
  height: 32px;
  color: #07C160;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-value {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.stat-label {
  font-size: 12px;
  color: #999;
}

.detail-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.record-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #f8f8f8;
  border-radius: 8px;
}

.record-time {
  font-size: 12px;
  color: #666;
  width: 48px;
}

.record-content {
  flex: 1;
}

.record-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.record-icon {
  width: 16px;
  height: 16px;
  color: #07C160;
}

.record-note {
  font-size: 12px;
  color: #666;
  margin: 0;
}

.record-duration {
  font-size: 12px;
  color: #07C160;
  font-weight: 500;
}
</style>

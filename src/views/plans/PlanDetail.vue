<template>
  <div class="plan-detail">
    <header class="header">
      <button class="back-button" @click="router.back()">
        <ArrowLeft />
      </button>
      <h1>{{ plan.name }}</h1>
      <button class="edit-button" @click="goToEditPlan">
        <Edit />
      </button>
    </header>

    <div class="content">
      <div class="description">
        <h2>计划描述</h2>
        <p>{{ plan.description }}</p>
      </div>

      <div class="progress-section">
        <div class="progress-ring">
          <svg class="progress-ring-circle" width="120" height="120">
            <circle
              stroke="#eee"
              stroke-width="8"
              fill="transparent"
              r="52"
              cx="60"
              cy="60"
            />
            <circle
              :stroke="getProgressColor(plan.progress)"
              stroke-width="8"
              fill="transparent"
              r="52"
              cx="60"
              cy="60"
              :style="circleStyle"
            />
          </svg>
          <div class="progress-text">
            <span class="check-count">{{ plan.checkedDays }}/{{ plan.totalDays }}</span>
            <span class="rate">签到率：{{ Math.round(plan.progress) }}%</span>
          </div>
        </div>
      </div>

      <div class="check-in-section">
        <button 
          class="check-in-button" 
          :class="{ checked: plan.checkedToday }"
          @click="handleCheckIn"
        >
          {{ plan.checkedToday ? '今日已打卡' : '打卡' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeft, Edit } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

// Mock data - replace with real data later
const plan = ref({
  id: route.params.id,
  name: '每日阅读计划',
  description: '每天阅读30分钟，培养良好的阅读习惯。通过持续的阅读提升知识储备和思维能力。',
  progress: 65,
  checkedDays: 13,
  totalDays: 20,
  checkedToday: false
})

const circleStyle = computed(() => {
  const circumference = 2 * Math.PI * 52
  const offset = circumference - (plan.value.progress / 100) * circumference
  return {
    strokeDasharray: `${circumference} ${circumference}`,
    strokeDashoffset: offset,
    transform: 'rotate(-90deg)',
    transformOrigin: '50% 50%'
  }
})

const getProgressColor = (progress) => {
  if (progress < 30) return '#ff4d4f'
  if (progress < 70) return '#faad14'
  return '#07C160'
}

const handleCheckIn = () => {
  if (plan.value.checkedToday) return
  
  // Mock check-in logic - replace with real API call later
  plan.value.checkedToday = true
  plan.value.checkedDays++
  plan.value.progress = (plan.value.checkedDays / plan.value.totalDays) * 100
}

const goToEditPlan = () => {
  router.push(`/plans/${plan.value.id}/edit`)
}
</script>

<style scoped>
.plan-detail {
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: white;
}

.header h1 {
  font-size: 18px;
  font-weight: 600;
}

.back-button,
.edit-button {
  padding: 8px;
  color: #666;
}

.content {
  padding: 20px;
}

.description {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
}

.description h2 {
  font-size: 16px;
  margin-bottom: 8px;
}

.description p {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.progress-section {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

.progress-ring {
  position: relative;
  width: 120px;
  height: 120px;
}

.progress-ring-circle {
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}

.progress-ring-circle circle {
  transition: stroke-dashoffset 0.3s ease;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.check-count {
  display: block;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 4px;
}

.rate {
  display: block;
  font-size: 12px;
  color: #666;
}

.check-in-section {
  margin-top: 30px;
  text-align: center;
}

.check-in-button {
  padding: 12px 40px;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 500;
  background: #07C160;
  color: white;
  transition: opacity 0.2s;
}

.check-in-button:hover {
  opacity: 0.9;
}

.check-in-button.checked {
  background: #ddd;
  cursor: default;
}
</style>

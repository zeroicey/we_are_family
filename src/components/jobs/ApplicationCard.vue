<template>
  <div class="application-card" @click="handleClick">
    <div class="job-info">
      <div class="company-info">
        <img :src="application.companyLogo" :alt="application.companyName" class="company-logo">
        <div class="company-meta">
          <h3 class="job-title">{{ application.jobTitle }}</h3>
          <p class="company-name">{{ application.companyName }}</p>
        </div>
      </div>
      
      <div class="status" :class="application.status">
        {{ getStatusText(application.status) }}
      </div>
    </div>
    
    <div class="application-meta">
      <div class="meta-items">
        <div class="meta-item">
          <Calendar class="meta-icon" />
          <span>投递时间：{{ application.applyTime }}</span>
        </div>
        <div class="meta-item" v-if="application.updateTime">
          <Clock class="meta-icon" />
          <span>更新时间：{{ application.updateTime }}</span>
        </div>
      </div>
      
      <div class="progress">
        <div 
          v-for="step in progressSteps" 
          :key="step.status"
          class="progress-step"
          :class="{
            active: isStepActive(step.status, application.status),
            current: step.status === application.status
          }"
        >
          <div class="step-dot"></div>
          <span class="step-text">{{ step.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Calendar, Clock } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  application: {
    type: Object,
    required: true
  }
})

const progressSteps = [
  { status: 'submitted', text: '已投递' },
  { status: 'reviewing', text: '简历筛选' },
  { status: 'interview', text: '面试中' },
  { status: 'offer', text: 'Offer' }
]

const getStatusText = (status) => {
  const statusMap = {
    submitted: '已投递',
    reviewing: '审核中',
    interview: '面试中',
    offer: '已录用',
    rejected: '不合适',
    expired: '已过期'
  }
  return statusMap[status] || status
}

const isStepActive = (stepStatus, currentStatus) => {
  const statusOrder = {
    submitted: 0,
    reviewing: 1,
    interview: 2,
    offer: 3
  }
  
  // 如果是已拒绝或过期状态，只激活"已投递"
  if (['rejected', 'expired'].includes(currentStatus)) {
    return stepStatus === 'submitted'
  }
  
  return statusOrder[stepStatus] <= statusOrder[currentStatus]
}

const handleClick = () => {
  router.push({
    name: 'JobDetail',
    params: { id: props.application.jobId }
  })
}
</script>

<style scoped>
.application-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.application-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.job-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.company-info {
  display: flex;
  gap: 12px;
}

.company-logo {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
}

.company-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.job-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.company-name {
  font-size: 14px;
  color: #666;
}

.status {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status.submitted {
  background: #E3F2FD;
  color: #1976D2;
}

.status.reviewing {
  background: #FFF3E0;
  color: #EF6C00;
}

.status.interview {
  background: #E8F5E9;
  color: #2E7D32;
}

.status.offer {
  background: #F3E5F5;
  color: #7B1FA2;
}

.status.rejected {
  background: #FFEBEE;
  color: #C62828;
}

.status.expired {
  background: #F5F5F5;
  color: #757575;
}

.application-meta {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.meta-items {
  display: flex;
  gap: 24px;
  color: #666;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
}

.meta-icon {
  width: 16px;
  height: 16px;
}

.progress {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 16px 0;
}

.progress::before {
  content: '';
  position: absolute;
  top: 24px;
  left: 12px;
  right: 12px;
  height: 2px;
  background: #f0f0f0;
}

.progress-step {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.step-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #f0f0f0;
  border: 2px solid white;
  z-index: 1;
  transition: all 0.3s ease;
}

.step-text {
  font-size: 12px;
  color: #999;
  transition: color 0.3s ease;
}

.progress-step.active .step-dot {
  background: #07C160;
}

.progress-step.active .step-text {
  color: #07C160;
}

.progress-step.current .step-dot {
  transform: scale(1.2);
  box-shadow: 0 0 0 4px rgba(7, 193, 96, 0.1);
}

@media (max-width: 768px) {
  .meta-items {
    flex-direction: column;
    gap: 8px;
  }

  .step-text {
    font-size: 10px;
  }
}
</style>

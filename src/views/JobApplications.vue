<template>
  <div class="applications-view">
    <AppHeader title="我的投递" />
    <div class="content">
      <div class="filters">
        <div class="filter-chips">
          <button 
            v-for="filter in filters" 
            :key="filter.value"
            class="chip"
            :class="{ active: currentFilter === filter.value }"
            @click="currentFilter = filter.value"
          >
            {{ filter.label }}
            <span class="count" v-if="getFilterCount(filter.value)">
              {{ getFilterCount(filter.value) }}
            </span>
          </button>
        </div>
      </div>

      <div v-if="!isLoading" class="applications">
        <ApplicationCard
          v-for="application in filteredApplications"
          :key="application.id"
          :application="application"
        />
        <div v-if="filteredApplications.length === 0" class="empty-state">
          <FileX class="empty-icon" />
          <p>暂无投递记录</p>
          <button class="browse-btn" @click="router.push({ name: 'jobs' })">
            去浏览职位
          </button>
        </div>
      </div>
      <div v-else class="applications">
        <JobCardSkeleton v-for="n in 3" :key="n" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { FileX } from 'lucide-vue-next'
import AppHeader from '../components/common/AppHeader.vue'
import ApplicationCard from '../components/jobs/ApplicationCard.vue'
import JobCardSkeleton from '../components/jobs/JobCardSkeleton.vue'

const router = useRouter()
const isLoading = ref(true)
const currentFilter = ref('all')

const filters = [
  { label: '全部', value: 'all' },
  { label: '进行中', value: 'active' },
  { label: '已完成', value: 'completed' },
]

// 模拟投递数据
const applications = ref([
  {
    id: 1,
    jobId: 1,
    jobTitle: '前端开发工程师',
    companyName: '字节跳动',
    companyLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=ByteDance',
    status: 'interview',
    applyTime: '2025-01-20 14:30',
    updateTime: '2025-01-21 10:00'
  },
  {
    id: 2,
    jobId: 2,
    jobTitle: 'Java开发工程师',
    companyName: '阿里巴巴',
    companyLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=Alibaba',
    status: 'reviewing',
    applyTime: '2025-01-19 16:45',
    updateTime: '2025-01-20 09:30'
  },
  {
    id: 3,
    jobId: 3,
    jobTitle: '产品经理',
    companyName: '腾讯',
    companyLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=Tencent',
    status: 'rejected',
    applyTime: '2025-01-18 11:20',
    updateTime: '2025-01-19 15:00'
  },
  {
    id: 4,
    jobId: 4,
    jobTitle: 'UI设计师',
    companyName: '美团',
    companyLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=Meituan',
    status: 'offer',
    applyTime: '2025-01-15 09:30',
    updateTime: '2025-01-18 16:30'
  }
])

const activeStatuses = ['submitted', 'reviewing', 'interview']
const completedStatuses = ['offer', 'rejected', 'expired']

const filteredApplications = computed(() => {
  if (currentFilter.value === 'all') {
    return applications.value
  }
  
  const statusesToShow = currentFilter.value === 'active' 
    ? activeStatuses 
    : completedStatuses
    
  return applications.value.filter(app => 
    statusesToShow.includes(app.status)
  )
})

const getFilterCount = (filterValue) => {
  if (filterValue === 'all') {
    return applications.value.length
  }
  
  const statusesToCount = filterValue === 'active' 
    ? activeStatuses 
    : completedStatuses
    
  return applications.value.filter(app => 
    statusesToCount.includes(app.status)
  ).length
}

// 模拟加载效果
setTimeout(() => {
  isLoading.value = false
}, 1000)
</script>

<style scoped>
.applications-view {
  min-height: 100vh;
  background: #f5f5f5;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.filters {
  position: sticky;
  top: 0;
  background: #f5f5f5;
  padding: 12px 0;
  margin-bottom: 20px;
  z-index: 1;
}

.filter-chips {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 4px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.filter-chips::-webkit-scrollbar {
  display: none;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  background: white;
  color: #666;
  border: none;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
}

.chip:hover {
  background: #f0f0f0;
}

.chip.active {
  background: #07C160;
  color: white;
}

.count {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 18px;
  height: 18px;
  padding: 0 6px;
  border-radius: 9px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}

.chip.active .count {
  background: rgba(255, 255, 255, 0.2);
}

.applications {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.empty-state {
  padding: 48px;
  text-align: center;
  background: white;
  border-radius: 12px;
  color: #666;
}

.empty-icon {
  width: 48px;
  height: 48px;
  color: #999;
  margin-bottom: 16px;
}

.empty-state p {
  font-size: 14px;
  margin-bottom: 24px;
}

.browse-btn {
  padding: 8px 24px;
  border-radius: 20px;
  font-size: 14px;
  background: #07C160;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.browse-btn:hover {
  background: #06a152;
}

@media (max-width: 768px) {
  .content {
    padding: 12px;
  }
}
</style>

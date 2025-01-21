<template>
  <div class="plan-list">
    <header class="header">
      <div class="search-bar">
        <Search class="search-icon" />
        <input type="text" placeholder="搜索计划名称" v-model="searchQuery" />
      </div>
      <div class="filter-tabs">
        <button 
          v-for="status in statusFilters" 
          :key="status.value"
          :class="['filter-tab', { active: currentStatus === status.value }]"
          @click="currentStatus = status.value"
        >
          {{ status.label }}
        </button>
      </div>
    </header>

    <div class="plan-cards">
      <div v-for="plan in filteredPlans" :key="plan.id" class="plan-card" @click="goToPlanDetail(plan.id)">
        <div class="plan-info">
          <h3>{{ plan.name }}</h3>
          <div class="progress-container">
            <div class="progress-bar">
              <div 
                class="progress" 
                :style="{ width: `${plan.progress}%` }"
                :class="getProgressClass(plan.progress)"
              ></div>
            </div>
            <span class="progress-text">{{ plan.progress }}%</span>
          </div>
        </div>
        <button class="edit-button" @click.stop="goToEditPlan(plan.id)">
          <Edit />
        </button>
      </div>
    </div>

    <button class="add-plan-button" @click="goToCreatePlan">
      <Plus />
      新建计划
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Edit, Plus } from 'lucide-vue-next'

const router = useRouter()
const searchQuery = ref('')
const currentStatus = ref('all')

const statusFilters = [
  { label: '全部', value: 'all' },
  { label: '进行中', value: 'ongoing' },
  { label: '已完成', value: 'completed' },
  { label: '已过期', value: 'expired' }
]

// Mock data - replace with real data later
const plans = ref([
  { id: 1, name: '每日阅读', progress: 25 },
  { id: 2, name: '跑步计划', progress: 45 },
  { id: 3, name: '学习Vue', progress: 85 },
])

const filteredPlans = computed(() => {
  return plans.value.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    if (currentStatus.value === 'all') return matchesSearch
    
    if (currentStatus.value === 'ongoing') return matchesSearch && plan.progress < 100
    if (currentStatus.value === 'completed') return matchesSearch && plan.progress === 100
    // Add more status filters as needed
    
    return matchesSearch
  })
})

const getProgressClass = (progress) => {
  if (progress < 30) return 'progress-low'
  if (progress < 70) return 'progress-medium'
  return 'progress-high'
}

const goToPlanDetail = (id) => {
  router.push(`/plans/${id}`)
}

const goToEditPlan = (id) => {
  router.push(`/plans/${id}/edit`)
}

const goToCreatePlan = () => {
  router.push('/plans/create')
}
</script>

<style scoped>
.plan-list {
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.header {
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  align-items: center;
  background: white;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.search-icon {
  width: 20px;
  height: 20px;
  color: #999;
  margin-right: 10px;
}

.search-bar input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
}

.filter-tabs {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 5px;
}

.filter-tab {
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  color: #666;
  background: white;
  white-space: nowrap;
}

.filter-tab.active {
  background: #07C160;
  color: white;
}

.plan-cards {
  display: grid;
  gap: 15px;
}

.plan-card {
  background: white;
  border-radius: 12px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.plan-info {
  flex: 1;
}

.plan-info h3 {
  margin-bottom: 10px;
  font-size: 16px;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: #eee;
  border-radius: 3px;
  overflow: hidden;
}

.progress {
  height: 100%;
  transition: width 0.3s ease;
}

.progress-low { background: #ff4d4f; }
.progress-medium { background: #faad14; }
.progress-high { background: #07C160; }

.progress-text {
  font-size: 12px;
  color: #666;
  min-width: 45px;
}

.edit-button {
  padding: 8px;
  color: #666;
}

.add-plan-button {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #07C160;
  color: white;
  border-radius: 24px;
  box-shadow: 0 2px 8px rgba(7, 193, 96, 0.3);
}
</style>

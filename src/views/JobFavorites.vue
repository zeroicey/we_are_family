<template>
  <div class="favorites-view">
    <AppHeader title="我的收藏" />
    <div class="content">
      <div v-if="!isLoading" class="favorites">
        <JobCard
          v-for="job in favorites"
          :key="job.id"
          :job="job"
        />
        <div v-if="favorites.length === 0" class="empty-state">
          <Bookmark class="empty-icon" />
          <p>暂无收藏的职位</p>
          <button class="browse-btn" @click="router.push({ name: 'jobs' })">
            去浏览职位
          </button>
        </div>
      </div>
      <div v-else class="favorites">
        <JobCardSkeleton v-for="n in 3" :key="n" />
      </div>

      <ActionDialog
        v-model:visible="showUnfavoriteDialog"
        title="取消收藏"
        confirm-text="确认取消"
        @confirm="confirmUnfavorite"
      >
        <div class="unfavorite-content">
          <p>确认取消收藏该职位吗？</p>
        </div>
      </ActionDialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Bookmark } from 'lucide-vue-next'
import AppHeader from '../components/common/AppHeader.vue'
import JobCard from '../components/jobs/JobCard.vue'
import JobCardSkeleton from '../components/jobs/JobCardSkeleton.vue'
import ActionDialog from '../components/common/ActionDialog.vue'

const router = useRouter()
const isLoading = ref(true)
const showUnfavoriteDialog = ref(false)
const selectedJobId = ref(null)

// 模拟收藏数据
const favorites = ref([
  {
    id: 1,
    companyLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=ByteDance',
    companyName: '字节跳动',
    companySize: '10000人以上',
    companyType: '互联网',
    title: '前端开发工程师',
    salary: '25-50K·13薪',
    tags: ['React', 'Vue', 'TypeScript'],
    location: '北京',
    education: '本科',
    postTime: '1小时前',
    highlights: [
      { icon: 'Rocket', label: '快速晋升' },
      { icon: 'Trophy', label: '业内顶尖薪资' }
    ],
    status: 'urgent',
    statusText: '急招',
    hasApplied: false,
    isCollected: true
  },
  {
    id: 2,
    companyLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=Alibaba',
    companyName: '阿里巴巴',
    companySize: '10000人以上',
    companyType: '互联网',
    title: 'Java开发工程师',
    salary: '20-40K·16薪',
    tags: ['Java', 'Spring Boot', 'MySQL'],
    location: '杭州',
    education: '本科',
    postTime: '2小时前',
    highlights: [
      { icon: 'Home', label: '可提供住宿' },
      { icon: 'GraduationCap', label: '应届生优先' }
    ],
    status: 'new',
    statusText: '新登记',
    hasApplied: true,
    isCollected: true
  }
])

// 模拟加载效果
setTimeout(() => {
  isLoading.value = false
}, 1000)

const handleUnfavorite = (jobId) => {
  selectedJobId.value = jobId
  showUnfavoriteDialog.value = true
}

const confirmUnfavorite = async () => {
  try {
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // 从收藏列表中移除
    favorites.value = favorites.value.filter(
      job => job.id !== selectedJobId.value
    )
    
    showUnfavoriteDialog.value = false
    selectedJobId.value = null
    
    // TODO: 显示取消收藏成功提示
  } catch (error) {
    console.error('Failed to unfavorite job:', error)
    // TODO: 显示取消收藏失败提示
  }
}
</script>

<style scoped>
.favorites-view {
  min-height: 100vh;
  background: #f5f5f5;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.favorites {
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

.unfavorite-content {
  text-align: center;
  padding: 12px 0;
}

@media (max-width: 768px) {
  .content {
    padding: 12px;
  }
}
</style>

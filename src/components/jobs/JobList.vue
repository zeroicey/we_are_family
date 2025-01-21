<template>
  <div class="job-list">
    <div v-if="!isLoading" class="jobs">
      <JobCard
        v-for="job in filteredJobs"
        :key="job.id"
        :job="job"
        @click="handleJobClick"
      />
      <div v-if="filteredJobs.length === 0" class="empty-state">
        <FileSearch class="empty-icon" />
        <p>暂无符合条件的职位</p>
      </div>
    </div>
    <div v-else class="jobs">
      <JobCardSkeleton v-for="n in 3" :key="n" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { FileSearch } from 'lucide-vue-next'
import JobCard from './JobCard.vue'
import JobCardSkeleton from './JobCardSkeleton.vue'

const props = defineProps({
  filters: {
    type: Object,
    default: () => ({})
  },
  searchQuery: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['select'])

const isLoading = ref(true)

// Mock jobs data
const jobs = ref([
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
      { icon: 'Trophy', label: '业内顶尖薪资' },
      { icon: 'Users', label: '氛围好' }
    ],
    status: 'urgent',
    statusText: '急招',
    hasApplied: false
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
    hasApplied: false
  },
  {
    id: 3,
    companyLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=Tencent',
    companyName: '腾讯',
    companySize: '10000人以上',
    companyType: '互联网',
    title: '产品经理',
    salary: '25-45K·14薪',
    tags: ['产品规划', '数据分析', '用户增长'],
    location: '深圳',
    education: '本科',
    postTime: '3小时前',
    highlights: [
      { icon: 'Briefcase', label: '双休' },
      { icon: 'Heart', label: '五险一金' },
      { icon: 'Coffee', label: '免费三餐' }
    ],
    status: 'new',
    statusText: '新登记',
    hasApplied: true
  }
])

const filteredJobs = computed(() => {
  let result = jobs.value

  // 搜索过滤
  if (props.searchQuery) {
    const query = props.searchQuery.toLowerCase()
    result = result.filter(job => 
      job.title.toLowerCase().includes(query) ||
      job.companyName.toLowerCase().includes(query)
    )
  }

  // 条件过滤
  Object.entries(props.filters).forEach(([key, value]) => {
    if (value) {
      result = result.filter(job => {
        switch (key) {
          case 'jobType':
            return true // 模拟数据暂时不过滤
          case 'location':
            return job.location.includes(value)
          case 'education':
            return value === 'any' || job.education.includes(value)
          case 'postTime':
            return true // 模拟数据暂时不过滤
          default:
            return true
        }
      })
    }
  })

  return result
})

const handleJobClick = (job) => {
  emit('select', job)
}

// 模拟加载效果
setTimeout(() => {
  isLoading.value = false
}, 1500)
</script>

<style scoped>
.job-list {
  flex: 1;
  min-width: 0;
}

.jobs {
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
}
</style>

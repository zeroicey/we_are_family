<template>
  <div class="job-detail-view">
    <AppHeader title="职位详情" />
    <div class="content">
      <JobDetail
        v-if="job"
        :job="job"
        @collect="handleCollect"
        @apply="handleApply"
      />
      <div v-else-if="isLoading" class="loading">
        <JobCardSkeleton />
      </div>
      <div v-else class="error">
        <FileX class="error-icon" />
        <p>职位不存在或已下线</p>
        <button class="back-btn" @click="router.back()">返回上一页</button>
      </div>
    </div>

    <ActionDialog
      v-model:visible="showApplyDialog"
      title="投递确认"
      :confirm-text="'确认投递'"
      :cancel-text="'取消'"
      @confirm="confirmApply"
    >
      <div class="apply-content">
        <p>确认要投递该职位吗？</p>
        <p class="apply-tip">投递后可在"我的投递"中查看进度</p>
      </div>
    </ActionDialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { FileX } from 'lucide-vue-next'
import AppHeader from '../components/common/AppHeader.vue'
import JobDetail from '../components/jobs/JobDetail.vue'
import JobCardSkeleton from '../components/jobs/JobCardSkeleton.vue'
import ActionDialog from '../components/common/ActionDialog.vue'

const router = useRouter()
const route = useRoute()
const isLoading = ref(true)
const job = ref(null)
const showApplyDialog = ref(false)

// 模拟获取职位详情
const fetchJobDetail = async (id) => {
  isLoading.value = true
  try {
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟数据
    job.value = {
      id: 1,
      companyLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=ByteDance',
      companyName: '字节跳动',
      companySize: '10000人以上',
      companyType: '互联网',
      companyStatus: '已上市',
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
      hasApplied: false,
      isCollected: false,
      description: `
        <p>我们正在寻找优秀的前端开发工程师加入我们的团队！</p>
        <p>你将参与：</p>
        <ul>
          <li>负责公司核心产品的前端开发工作</li>
          <li>参与产品的技术方案设计和技术选型</li>
          <li>负责前端基础设施建设，提升开发效率</li>
          <li>探索和实践前端新技术，保持技术领先性</li>
        </ul>
      `,
      requirements: `
        <p>岗位要求：</p>
        <ul>
          <li>本科及以上学历，计算机相关专业优先</li>
          <li>熟练掌握 HTML、CSS、JavaScript</li>
          <li>熟悉 React 或 Vue 等主流框架</li>
          <li>有良好的代码风格和编程习惯</li>
          <li>有强烈的求知欲和进取心</li>
        </ul>
      `,
      address: '北京市海淀区科学园区',
      addressDetail: '科创大厦B座'
    }
  } catch (error) {
    console.error('Failed to fetch job detail:', error)
    job.value = null
  } finally {
    isLoading.value = false
  }
}

const handleCollect = async (isCollect) => {
  // 模拟收藏请求
  await new Promise(resolve => setTimeout(resolve, 300))
  job.value.isCollected = isCollect
}

const handleApply = () => {
  showApplyDialog.value = true
}

const confirmApply = async () => {
  try {
    // 模拟投递请求
    await new Promise(resolve => setTimeout(resolve, 500))
    job.value.hasApplied = true
    showApplyDialog.value = false
    // TODO: 显示投递成功提示
  } catch (error) {
    console.error('Failed to apply job:', error)
    // TODO: 显示投递失败提示
  }
}

onMounted(() => {
  const jobId = route.params.id
  if (jobId) {
    fetchJobDetail(jobId)
  }
})
</script>

<style scoped>
.job-detail-view {
  min-height: 100vh;
  background: #f5f5f5;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading, .error {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.error {
  text-align: center;
  padding: 48px 24px;
  color: #666;
}

.error-icon {
  width: 48px;
  height: 48px;
  color: #999;
  margin-bottom: 16px;
}

.back-btn {
  margin-top: 24px;
  padding: 8px 24px;
  border-radius: 20px;
  font-size: 14px;
  background: #07C160;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: #06a152;
}

.apply-content {
  text-align: center;
  padding: 12px 0;
}

.apply-tip {
  margin-top: 8px;
  font-size: 14px;
  color: #999;
}

@media (max-width: 768px) {
  .content {
    padding: 12px;
  }
}
</style>

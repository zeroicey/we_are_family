<template>
  <div class="resume-view">
    <AppHeader title="我的简历" />
    
    <div class="content">
      <div class="actions">
        <button class="action-btn edit" @click="handleEdit">
          <Edit3 class="btn-icon" />
          编辑简历
        </button>
        <button class="action-btn preview" @click="handlePreview">
          <Eye class="btn-icon" />
          预览PDF
        </button>
        <button class="action-btn download" @click="handleDownload">
          <Download class="btn-icon" />
          下载简历
        </button>
      </div>

      <ResumePreview :resume="resume" />
    </div>

    <!-- 预览对话框 -->
    <ActionDialog
      v-model:visible="showPreviewDialog"
      title="简历预览"
      :show-footer="false"
      width="800px"
    >
      <div class="preview-dialog">
        <ResumePreview :resume="resume" />
      </div>
    </ActionDialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Edit3, Eye, Download } from 'lucide-vue-next'
import AppHeader from '../../components/common/AppHeader.vue'
import ResumePreview from '../../components/resume/ResumePreview.vue'
import ActionDialog from '../../components/common/ActionDialog.vue'

const router = useRouter()
const showPreviewDialog = ref(false)

// 模拟简历数据
const resume = ref({
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  name: '张同学',
  education: '本科在读',
  location: '杭州',
  email: 'zhangsan@example.com',
  phone: '138****1234',
  education_list: [
    {
      school: '浙江大学',
      major: '计算机科学与技术',
      degree: '本科',
      time: '2021.09 - 2025.06',
      gpa: '3.8/4.0'
    }
  ],
  skills: [
    'JavaScript / TypeScript',
    'Vue.js / React.js',
    'Node.js / Express',
    'Python / Django',
    'MySQL / MongoDB',
    'Git / Linux'
  ],
  projects: [
    {
      name: '互成一家 - 校园互助小程序',
      role: '前端开发负责人',
      time: '2023.10 - 至今',
      points: [
        '使用Vue 3和TypeScript开发微信小程序，实现互助学习和求职功能',
        '设计并实现了实时配对系统，提高学习效率和用户体验',
        '开发了简历管理和投递跟踪功能，帮助学生更好地管理求职进度',
        '项目上线一个月内，累计用户超过1000人，日活跃用户200+'
      ]
    },
    {
      name: '校园二手交易平台',
      role: '全栈开发',
      time: '2023.03 - 2023.06',
      points: [
        '使用React和Node.js开发校园二手交易平台',
        '实现了商品发布、搜索、收藏、购物车等核心功能',
        '开发了实时聊天功能，方便买卖双方沟通',
        '项目获得校园创新创业大赛二等奖'
      ]
    }
  ],
  internships: [
    {
      company: '字节跳动',
      position: '前端开发实习生',
      time: '2023.07 - 2023.09',
      points: [
        '参与抖音创作者平台的开发，负责数据可视化模块',
        '优化了大数据表格的渲染性能，提升加载速度50%',
        '开发了自定义图表组件，支持多种数据展示方式',
        '编写单元测试，测试覆盖率达到85%'
      ]
    }
  ]
})

const handleEdit = () => {
  router.push('/profile/resume/edit')
}

const handlePreview = () => {
  showPreviewDialog.value = true
}

const handleDownload = async () => {
  try {
    // TODO: 调用后端API生成PDF
    console.log('Downloading resume...')
  } catch (error) {
    console.error('Failed to download resume:', error)
  }
}
</script>

<style scoped>
.resume-view {
  min-height: 100vh;
  background: #f5f5f5;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.actions {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-icon {
  width: 16px;
  height: 16px;
}

.edit {
  background: #07C160;
  color: white;
}

.edit:hover {
  background: #06a152;
}

.preview {
  background: white;
  color: #666;
}

.preview:hover {
  background: #f0f0f0;
}

.download {
  background: #1976D2;
  color: white;
}

.download:hover {
  background: #1565C0;
}

.preview-dialog {
  max-height: 80vh;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .content {
    padding: 12px;
  }

  .actions {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    padding: 12px;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }

  .action-btn {
    flex: 1;
    justify-content: center;
  }
}
</style>

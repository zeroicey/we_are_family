<template>
  <div class="resume-edit">
    <AppHeader title="编辑简历" />
    
    <div class="content">
      <form class="edit-form" @submit.prevent="handleSubmit">
        <!-- 基本信息 -->
        <div class="form-section">
          <h3>基本信息</h3>
          <div class="basic-info">
            <div class="avatar-section">
              <AvatarUpload
                v-model="formData.avatar"
                @change="handleAvatarChange"
              />
            </div>
            
            <div class="info-fields">
              <div class="form-row">
                <div class="form-group">
                  <label>姓名</label>
                  <input
                    v-model="formData.name"
                    type="text"
                    placeholder="请输入姓名"
                    class="form-input"
                  >
                </div>
                <div class="form-group">
                  <label>邮箱</label>
                  <input
                    v-model="formData.email"
                    type="email"
                    placeholder="请输入邮箱"
                    class="form-input"
                  >
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>电话</label>
                  <input
                    v-model="formData.phone"
                    type="tel"
                    placeholder="请输入电话"
                    class="form-input"
                  >
                </div>
                <div class="form-group">
                  <label>所在地</label>
                  <input
                    v-model="formData.location"
                    type="text"
                    placeholder="请输入所在地"
                    class="form-input"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 教育经历 -->
        <EducationForm v-model="formData.education_list" />

        <!-- 专业技能 -->
        <SkillsForm v-model="formData.skills" />

        <!-- 项目经历 -->
        <ProjectForm v-model="formData.projects" />

        <!-- 实习经历 -->
        <InternshipForm v-model="formData.internships" />

        <div class="form-actions">
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? '保存中...' : '保存简历' }}
          </button>
        </div>
      </form>
    </div>

    <ActionDialog
      v-model:visible="showDiscardDialog"
      title="放弃修改"
      confirm-text="确认放弃"
      @confirm="confirmDiscard"
    >
      <div class="discard-content">
        <p>确认要放弃未保存的修改吗？</p>
      </div>
    </ActionDialog>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../../components/common/AppHeader.vue'
import ActionDialog from '../../components/common/ActionDialog.vue'
import AvatarUpload from '../../components/profile/AvatarUpload.vue'
import EducationForm from '../../components/resume/EducationForm.vue'
import SkillsForm from '../../components/resume/SkillsForm.vue'
import ProjectForm from '../../components/resume/ProjectForm.vue'
import InternshipForm from '../../components/resume/InternshipForm.vue'

const router = useRouter()
const isSubmitting = ref(false)
const showDiscardDialog = ref(false)
const hasChanges = ref(false)

// 模拟初始数据
const formData = ref({
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  name: '张同学',
  email: 'zhangsan@example.com',
  phone: '138****1234',
  location: '杭州',
  education_list: [
    {
      school: '浙江大学',
      major: '计算机科学与技术',
      degree: '本科',
      startTime: '2021-09',
      endTime: '2025-06',
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

const handleAvatarChange = (file) => {
  hasChanges.value = true
  // TODO: 上传头像到服务器
  console.log('Avatar file:', file)
}

const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    
    // 表单验证
    if (!formData.value.name?.trim()) {
      // TODO: 显示错误提示
      console.error('请输入姓名')
      return
    }
    
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    hasChanges.value = false
    router.back()
    
    // TODO: 显示保存成功提示
  } catch (error) {
    console.error('Failed to save resume:', error)
    // TODO: 显示保存失败提示
  } finally {
    isSubmitting.value = false
  }
}

// 处理返回
const handleBack = () => {
  if (hasChanges.value) {
    showDiscardDialog.value = true
  } else {
    router.back()
  }
}

const confirmDiscard = () => {
  showDiscardDialog.value = false
  router.back()
}

// 路由离开确认
onBeforeUnmount(() => {
  if (hasChanges.value) {
    // TODO: 显示未保存提示
  }
})
</script>

<style scoped>
.resume-edit {
  min-height: 100vh;
  background: #f5f5f5;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
}

.form-section h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.basic-info {
  display: flex;
  gap: 32px;
}

.avatar-section {
  flex-shrink: 0;
}

.info-fields {
  flex: 1;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  color: #333;
}

.form-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  transition: all 0.2s ease;
}

.form-input:focus {
  border-color: #07C160;
  outline: none;
}

.form-actions {
  position: sticky;
  bottom: 20px;
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #07C160;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-btn:hover {
  background: #06a152;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.discard-content {
  text-align: center;
  padding: 12px 0;
}

@media (max-width: 768px) {
  .content {
    padding: 12px;
  }

  .form-section {
    padding: 16px;
    border-radius: 0;
  }

  .basic-info {
    flex-direction: column;
    align-items: center;
  }

  .info-fields {
    width: 100%;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .form-actions {
    border-radius: 0;
    bottom: 0;
  }
}
</style>

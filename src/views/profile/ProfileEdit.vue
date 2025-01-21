<template>
  <div class="profile-edit">
    <AppHeader title="编辑资料" />
    
    <div class="content">
      <form class="edit-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>头像</label>
          <AvatarUpload
            v-model="formData.avatar"
            @change="handleAvatarChange"
          />
        </div>

        <div class="form-group">
          <label>姓名</label>
          <input
            v-model="formData.name"
            type="text"
            placeholder="请输入你的姓名"
            class="form-input"
          >
        </div>

        <div class="form-group">
          <label>学校</label>
          <input
            v-model="formData.school"
            type="text"
            placeholder="请输入你的学校"
            class="form-input"
          >
        </div>

        <div class="form-group">
          <label>专业</label>
          <input
            v-model="formData.major"
            type="text"
            placeholder="请输入你的专业"
            class="form-input"
          >
        </div>

        <div class="form-group">
          <label>年级</label>
          <select v-model="formData.grade" class="form-input">
            <option value="">请选择年级</option>
            <option value="大一">大一</option>
            <option value="大二">大二</option>
            <option value="大三">大三</option>
            <option value="大四">大四</option>
            <option value="研一">研一</option>
            <option value="研二">研二</option>
            <option value="研三">研三</option>
          </select>
        </div>

        <div class="form-group">
          <label>所在地</label>
          <input
            v-model="formData.location"
            type="text"
            placeholder="请输入你的所在地"
            class="form-input"
          >
        </div>

        <div class="form-group">
          <label>个人简介</label>
          <textarea
            v-model="formData.bio"
            placeholder="介绍一下你自己吧"
            class="form-textarea"
            rows="4"
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? '保存中...' : '保存修改' }}
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
import AvatarUpload from '../../components/profile/AvatarUpload.vue'
import ActionDialog from '../../components/common/ActionDialog.vue'

const router = useRouter()
const isSubmitting = ref(false)
const showDiscardDialog = ref(false)
const hasChanges = ref(false)

// 模拟初始数据
const formData = ref({
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  name: '张同学',
  school: '浙江大学',
  major: '计算机科学与技术',
  grade: '大三',
  location: '杭州',
  bio: '热爱技术，对互联网充满热情。希望在校招中找到理想的工作。'
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
    
    if (!formData.value.school?.trim()) {
      // TODO: 显示错误提示
      console.error('请输入学校')
      return
    }
    
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    hasChanges.value = false
    router.back()
    
    // TODO: 显示保存成功提示
  } catch (error) {
    console.error('Failed to save profile:', error)
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
.profile-edit {
  min-height: 100vh;
  background: #f5f5f5;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.edit-form {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  transition: all 0.2s ease;
}

.form-input:focus {
  border-color: #07C160;
  outline: none;
}

.form-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  resize: vertical;
  min-height: 100px;
  transition: all 0.2s ease;
}

.form-textarea:focus {
  border-color: #07C160;
  outline: none;
}

.form-actions {
  margin-top: 32px;
  text-align: center;
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
  
  .edit-form {
    padding: 16px;
    border-radius: 0;
  }
}
</style>

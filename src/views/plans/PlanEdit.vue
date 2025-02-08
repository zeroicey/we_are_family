<template>
  <div class="plan-edit">
    <AppHeader title="编辑任务" />
    
    <div class="content">
      <form @submit.prevent="handleSubmit" class="edit-form">
        <div class="form-group">
          <label for="title">任务标题</label>
          <div class="input-wrapper">
            <input
              id="title"
              v-model="form.title"
              type="text"
              placeholder="请输入任务标题"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="description">任务描述</label>
          <div class="input-wrapper">
            <textarea
              id="description"
              v-model="form.description"
              placeholder="请输入任务描述"
              rows="4"
            ></textarea>
          </div>
        </div>

        <div class="form-group">
          <label for="deadline">截止时间</label>
          <div class="input-wrapper">
            <input
              id="deadline"
              v-model="form.deadline"
              type="datetime-local"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="priority">优先级</label>
          <div class="input-wrapper">
            <select id="priority" v-model="form.priority">
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-cancel" @click="handleCancel">取消</button>
          <button type="submit" class="btn btn-primary">保存</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '../../components/common/AppHeader.vue'

const route = useRoute()
const router = useRouter()
const planId = route.params.id

const form = ref({
  title: '',
  description: '',
  deadline: '',
  priority: 'medium'
})

onMounted(async () => {
  try {
    // TODO: 从API获取任务详情
    // const response = await getPlanById(planId)
    // form.value = response.data
  } catch (error) {
    console.error('Failed to fetch plan details:', error)
  }
})

const handleSubmit = async () => {
  try {
    // TODO: 调用API更新任务
    // await updatePlan(planId, form.value)
    router.push(`/plans/${planId}`)
  } catch (error) {
    console.error('Failed to update plan:', error)
  }
}

const handleCancel = () => {
  router.back()
}
</script>

<style scoped>
.plan-edit {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.content {
  padding: 16px;
}

.edit-form {
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-primary);
  font-size: 15px;
}

.input-wrapper {
  position: relative;
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.input-wrapper:focus-within {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(7, 193, 96, 0.1);
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 12px;
  border: none;
  background: transparent;
  font-size: 15px;
  color: var(--text-primary);
  border-radius: 8px;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--text-tertiary);
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: #06ae56;
}

.btn-cancel {
  background-color: #f5f5f5;
  color: var(--text-secondary);
}

.btn-cancel:hover {
  background-color: #e8e8e8;
}
</style>

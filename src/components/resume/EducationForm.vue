<template>
  <div class="education-form">
    <div class="form-header">
      <h3>教育经历</h3>
      <button class="add-btn" @click="handleAdd">
        <Plus class="btn-icon" />
        添加教育经历
      </button>
    </div>

    <div class="education-list">
      <div 
        v-for="(edu, index) in modelValue" 
        :key="index"
        class="education-item"
      >
        <div class="item-header">
          <h4>教育经历 {{ index + 1 }}</h4>
          <button class="delete-btn" @click="handleDelete(index)">
            <Trash2 class="btn-icon" />
          </button>
        </div>

        <div class="form-group">
          <label>学校</label>
          <input
            v-model="edu.school"
            type="text"
            placeholder="请输入学校名称"
            class="form-input"
          >
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>专业</label>
            <input
              v-model="edu.major"
              type="text"
              placeholder="请输入专业名称"
              class="form-input"
            >
          </div>
          <div class="form-group">
            <label>学位</label>
            <select v-model="edu.degree" class="form-input">
              <option value="">请选择学位</option>
              <option value="本科">本科</option>
              <option value="硕士">硕士</option>
              <option value="博士">博士</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>入学时间</label>
            <input
              v-model="edu.startTime"
              type="month"
              class="form-input"
            >
          </div>
          <div class="form-group">
            <label>毕业时间</label>
            <input
              v-model="edu.endTime"
              type="month"
              class="form-input"
            >
          </div>
        </div>

        <div class="form-group">
          <label>GPA</label>
          <input
            v-model="edu.gpa"
            type="text"
            placeholder="选填，如: 3.8/4.0"
            class="form-input"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Plus, Trash2 } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const handleAdd = () => {
  const newEducation = {
    school: '',
    major: '',
    degree: '',
    startTime: '',
    endTime: '',
    gpa: ''
  }
  emit('update:modelValue', [...props.modelValue, newEducation])
}

const handleDelete = (index) => {
  const newValue = [...props.modelValue]
  newValue.splice(index, 1)
  emit('update:modelValue', newValue)
}
</script>

<style scoped>
.education-form {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.form-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: #07C160;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-btn:hover {
  background: #06a152;
}

.btn-icon {
  width: 16px;
  height: 16px;
}

.education-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.education-item {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.item-header h4 {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.delete-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: #f5f5f5;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
}

.delete-btn:hover {
  background: #ff4d4f;
  color: white;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
}

.form-input {
  width: 100%;
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

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 768px) {
  .education-form {
    padding: 16px;
    border-radius: 0;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>

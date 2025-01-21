<template>
  <div class="internship-form">
    <div class="form-header">
      <h3>实习经历</h3>
      <button class="add-btn" @click="handleAdd">
        <Plus class="btn-icon" />
        添加实习经历
      </button>
    </div>

    <div class="internship-list">
      <div 
        v-for="(intern, index) in modelValue" 
        :key="index"
        class="internship-item"
      >
        <div class="item-header">
          <h4>实习经历 {{ index + 1 }}</h4>
          <button class="delete-btn" @click="handleDelete(index)">
            <Trash2 class="btn-icon" />
          </button>
        </div>

        <div class="form-group">
          <label>公司名称</label>
          <input
            v-model="intern.company"
            type="text"
            placeholder="请输入公司名称"
            class="form-input"
          >
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>职位名称</label>
            <input
              v-model="intern.position"
              type="text"
              placeholder="如：前端开发实习生"
              class="form-input"
            >
          </div>
          <div class="form-group">
            <label>实习时间</label>
            <input
              v-model="intern.time"
              type="text"
              placeholder="如：2023.07 - 2023.09"
              class="form-input"
            >
          </div>
        </div>

        <div class="form-group">
          <label>工作内容</label>
          <div class="points-list">
            <div 
              v-for="(point, pIndex) in intern.points" 
              :key="pIndex"
              class="point-item"
            >
              <input
                v-model="intern.points[pIndex]"
                type="text"
                placeholder="请输入工作内容"
                class="form-input"
              >
              <button 
                class="remove-point" 
                @click="removePoint(index, pIndex)"
                :disabled="intern.points.length <= 1"
              >
                <X class="btn-icon" />
              </button>
            </div>
            <button class="add-point" @click="addPoint(index)">
              <Plus class="btn-icon" />
              添加内容
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Plus, Trash2, X } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const handleAdd = () => {
  const newInternship = {
    company: '',
    position: '',
    time: '',
    points: ['']
  }
  emit('update:modelValue', [...props.modelValue, newInternship])
}

const handleDelete = (index) => {
  const newValue = [...props.modelValue]
  newValue.splice(index, 1)
  emit('update:modelValue', newValue)
}

const addPoint = (internIndex) => {
  const newValue = [...props.modelValue]
  newValue[internIndex].points.push('')
  emit('update:modelValue', newValue)
}

const removePoint = (internIndex, pointIndex) => {
  const newValue = [...props.modelValue]
  if (newValue[internIndex].points.length > 1) {
    newValue[internIndex].points.splice(pointIndex, 1)
    emit('update:modelValue', newValue)
  }
}
</script>

<style scoped>
.internship-form {
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

.internship-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.internship-item {
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

.points-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.point-item {
  display: flex;
  gap: 8px;
}

.remove-point {
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

.remove-point:hover {
  background: #ff4d4f;
  color: white;
}

.remove-point:disabled {
  background: #f5f5f5;
  color: #ccc;
  cursor: not-allowed;
}

.add-point {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px;
  border: 1px dashed #ddd;
  border-radius: 6px;
  background: white;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-point:hover {
  border-color: #07C160;
  color: #07C160;
}

@media (max-width: 768px) {
  .internship-form {
    padding: 16px;
    border-radius: 0;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>

<template>
  <div class="plan-create">
    <header class="header">
      <button class="back-button" @click="router.back()">
        <ArrowLeft />
      </button>
      <h1>新建计划</h1>
      <div class="placeholder"></div>
    </header>

    <form class="form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>计划名称</label>
        <input 
          type="text" 
          v-model="formData.name"
          placeholder="请输入计划名称"
          required
        />
      </div>

      <div class="form-group">
        <label>计划描述</label>
        <textarea 
          v-model="formData.description"
          placeholder="请输入计划描述"
          rows="4"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label>起始日期</label>
        <input 
          type="date" 
          v-model="formData.startDate"
          required
        />
      </div>

      <div class="form-group">
        <label>结束日期</label>
        <input 
          type="date" 
          v-model="formData.endDate"
          required
        />
      </div>

      <div class="form-group">
        <label>总打卡次数</label>
        <div class="number-input">
          <input 
            type="number" 
            v-model="formData.totalDays"
            min="1"
            max="100"
            required
          />
          <div class="number-controls">
            <button type="button" @click="adjustTotalDays(1)">
              <ChevronUp />
            </button>
            <button type="button" @click="adjustTotalDays(-1)">
              <ChevronDown />
            </button>
          </div>
        </div>
      </div>

      <button type="submit" class="submit-button">
        保存
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, ChevronUp, ChevronDown } from 'lucide-vue-next'

const router = useRouter()

const formData = ref({
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  totalDays: 30
})

const adjustTotalDays = (delta) => {
  const newValue = formData.value.totalDays + delta
  if (newValue >= 1 && newValue <= 100) {
    formData.value.totalDays = newValue
  }
}

const handleSubmit = () => {
  // Mock submit logic - replace with real API call later
  console.log('Form submitted:', formData.value)
  router.push('/plans')
}
</script>

<style scoped>
.plan-create {
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: white;
}

.header h1 {
  font-size: 18px;
  font-weight: 600;
}

.back-button {
  padding: 8px;
  color: #666;
}

.placeholder {
  width: 40px;
}

.form {
  padding: 20px;
}

.form-group {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px 0;
  border: none;
  outline: none;
  font-size: 16px;
}

.form-group textarea {
  resize: none;
}

.number-input {
  display: flex;
  align-items: center;
}

.number-input input {
  width: calc(100% - 40px);
}

.number-controls {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.number-controls button {
  padding: 4px;
  color: #666;
}

.submit-button {
  display: block;
  width: 100%;
  padding: 14px;
  margin-top: 30px;
  background: #07C160;
  color: white;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}

.submit-button:hover {
  opacity: 0.9;
}

/* Date input styling */
input[type="date"] {
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  background: transparent;
  padding: 0;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  color: transparent;
  cursor: pointer;
}

/* Number input styling */
input[type="number"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

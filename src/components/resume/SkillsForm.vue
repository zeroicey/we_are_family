<template>
  <div class="skills-form">
    <div class="form-header">
      <h3>专业技能</h3>
    </div>

    <div class="skills-editor">
      <div class="skills-list">
        <div 
          v-for="(skill, index) in modelValue" 
          :key="index"
          class="skill-item"
        >
          <span class="skill-text">{{ skill }}</span>
          <button class="delete-btn" @click="handleDelete(index)">
            <X class="btn-icon" />
          </button>
        </div>
      </div>

      <div class="skill-input">
        <input
          v-model="newSkill"
          type="text"
          placeholder="输入技能，按回车添加"
          class="form-input"
          @keyup.enter="handleAdd"
        >
        <button 
          class="add-btn" 
          @click="handleAdd"
          :disabled="!newSkill.trim()"
        >
          <Plus class="btn-icon" />
          添加
        </button>
      </div>

      <div class="skills-tips">
        <p>技能示例：JavaScript / TypeScript、Vue.js / React.js、Node.js / Express、Python / Django 等</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, X } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const newSkill = ref('')

const handleAdd = () => {
  if (newSkill.value.trim()) {
    emit('update:modelValue', [...props.modelValue, newSkill.value.trim()])
    newSkill.value = ''
  }
}

const handleDelete = (index) => {
  const newValue = [...props.modelValue]
  newValue.splice(index, 1)
  emit('update:modelValue', newValue)
}
</script>

<style scoped>
.skills-form {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
}

.form-header {
  margin-bottom: 20px;
}

.form-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
  min-height: 40px;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: #f5f5f5;
  border-radius: 16px;
  font-size: 14px;
  color: #333;
}

.skill-text {
  line-height: 1;
}

.delete-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  background: none;
  color: #999;
  cursor: pointer;
  transition: all 0.2s ease;
}

.delete-btn:hover {
  color: #ff4d4f;
}

.btn-icon {
  width: 14px;
  height: 14px;
}

.skill-input {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.form-input {
  flex: 1;
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

.add-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.skills-tips {
  font-size: 12px;
  color: #999;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .skills-form {
    padding: 16px;
    border-radius: 0;
  }

  .skill-input {
    flex-direction: column;
  }

  .add-btn {
    justify-content: center;
  }
}
</style>

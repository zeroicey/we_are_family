<template>
  <ActionDialog
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    title="设置专注目标"
    :show-cancel="true"
    @confirm="handleConfirm"
  >
    <div class="focus-goal-form">
      <div class="form-group">
        <label>每日专注目标（分钟）</label>
        <input 
          type="number"
          v-model="form.dailyGoal"
          min="1"
          max="1440"
          placeholder="建议设置 25-120 分钟"
        />
      </div>

      <div class="form-group">
        <label>专注事项</label>
        <div class="tags">
          <button 
            v-for="tag in tags" 
            :key="tag.value"
            class="tag"
            :class="{ active: form.tag === tag.value }"
            @click="form.tag = tag.value"
          >
            <component :is="tag.icon" class="tag-icon" />
            {{ tag.label }}
          </button>
        </div>
      </div>

      <div class="form-group">
        <label>备注（可选）</label>
        <textarea 
          v-model="form.note"
          placeholder="记录一下你想专注的具体内容..."
          maxlength="100"
          rows="3"
        ></textarea>
        <span class="input-count">{{ form.note.length }}/100</span>
      </div>
    </div>
  </ActionDialog>
</template>

<script setup>
import { ref } from 'vue'
import { Book, Code, Pencil, Dumbbell, Coffee } from 'lucide-vue-next'
import ActionDialog from '../common/ActionDialog.vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:visible', 'confirm'])

const tags = [
  { label: '学习', value: 'study', icon: Book },
  { label: '编程', value: 'coding', icon: Code },
  { label: '写作', value: 'writing', icon: Pencil },
  { label: '运动', value: 'exercise', icon: Dumbbell },
  { label: '休息', value: 'rest', icon: Coffee }
]

const form = ref({
  dailyGoal: 25,
  tag: 'study',
  note: ''
})

const handleConfirm = () => {
  if (!form.value.dailyGoal || form.value.dailyGoal < 1) {
    // TODO: Show error message
    return
  }
  emit('confirm', { ...form.value })
}
</script>

<style scoped>
.focus-goal-form {
  padding: 0 12px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group:last-child {
  margin-bottom: 0;
}

label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}

input[type="number"] {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  background: #f5f5f5;
  color: #666;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tag:hover {
  background: #e0e0e0;
}

.tag.active {
  background: #07C160;
  color: white;
}

.tag-icon {
  width: 16px;
  height: 16px;
}

textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  resize: none;
}

.input-count {
  display: block;
  text-align: right;
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}
</style>

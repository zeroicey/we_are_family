<template>
  <ActionDialog
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    title="发起互助"
    :show-cancel="true"
    @confirm="handleConfirm"
  >
    <div class="create-help-form">
      <div class="form-group">
        <label>标题</label>
        <input 
          type="text"
          v-model="form.title"
          placeholder="简单描述你想做什么"
          maxlength="30"
        />
        <span class="input-count">{{ form.title.length }}/30</span>
      </div>

      <div class="form-group">
        <label>详细说明</label>
        <textarea
          v-model="form.description"
          placeholder="详细描述你的互助需求、目标等"
          rows="4"
          maxlength="200"
        ></textarea>
        <span class="input-count">{{ form.description.length }}/200</span>
      </div>

      <div class="form-group">
        <label>标签</label>
        <div class="tags-select">
          <div 
            v-for="tag in availableTags"
            :key="tag.value"
            class="tag"
            :class="{ active: form.tags.includes(tag.value) }"
            @click="toggleTag(tag.value)"
          >
            {{ tag.label }}
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>频率</label>
          <select v-model="form.schedule.frequency">
            <option value="每天">每天</option>
            <option value="每周三次">每周三次</option>
            <option value="每周两次">每周两次</option>
            <option value="每周一次">每周一次</option>
            <option value="灵活安排">灵活安排</option>
          </select>
        </div>

        <div class="form-group">
          <label>时间段</label>
          <select v-model="form.schedule.timeSlot">
            <option value="上午9点-12点">上午9点-12点</option>
            <option value="下午2点-5点">下午2点-5点</option>
            <option value="晚上7点-9点">晚上7点-9点</option>
            <option value="晚上8点-10点">晚上8点-10点</option>
            <option value="待商议">待商议</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>持续时间</label>
          <select v-model="form.duration">
            <option value="1周">1周</option>
            <option value="2周">2周</option>
            <option value="1个月">1个月</option>
            <option value="2个月">2个月</option>
            <option value="3个月">3个月</option>
            <option value="长期">长期</option>
          </select>
        </div>

        <div class="form-group">
          <label>人数限制</label>
          <select v-model="form.memberLimit">
            <option :value="2">2人</option>
            <option :value="3">3人</option>
            <option :value="4">4人</option>
            <option :value="5">5人</option>
          </select>
        </div>
      </div>
    </div>
  </ActionDialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import ActionDialog from '../common/ActionDialog.vue'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:visible', 'success'])

// 可选标签
const availableTags = [
  { label: '算法', value: 'algorithm' },
  { label: '前端', value: 'frontend' },
  { label: '后端', value: 'backend' },
  { label: '面试', value: 'interview' },
  { label: '项目', value: 'project' },
  { label: '英语', value: 'english' }
]

// 表单数据
const form = ref({
  title: '',
  description: '',
  tags: [],
  schedule: {
    frequency: '每天',
    timeSlot: '晚上8点-10点'
  },
  duration: '1个月',
  memberLimit: 2
})

// 表单是否有效
const isValid = computed(() => {
  return form.value.title.length >= 5 &&
         form.value.description.length >= 20 &&
         form.value.tags.length > 0
})

// 切换标签
const toggleTag = (tag) => {
  const index = form.value.tags.indexOf(tag)
  if (index === -1) {
    if (form.value.tags.length < 3) {
      form.value.tags.push(tag)
    }
  } else {
    form.value.tags.splice(index, 1)
  }
}

// 确认创建
const handleConfirm = () => {
  if (!isValid.value) return
  
  emit('success', { ...form.value })
  emit('update:visible', false)
  
  // 重置表单
  form.value = {
    title: '',
    description: '',
    tags: [],
    schedule: {
      frequency: '每天',
      timeSlot: '晚上8点-10点'
    },
    duration: '1个月',
    memberLimit: 2
  }
}
</script>

<style scoped>
.create-help-form {
  padding: 0 12px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-size: 14px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

input,
textarea,
select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  background: white;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.input-count {
  display: block;
  text-align: right;
  margin-top: 4px;
  font-size: 12px;
  color: #999;
}

.tags-select {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 6px 12px;
  border-radius: 16px;
  background: #f5f5f5;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.tag:hover {
  background: #e6e6e6;
}

.tag.active {
  background: #07C160;
  color: white;
}

@media (max-width: 768px) {
  .create-help-form {
    padding: 0 8px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>

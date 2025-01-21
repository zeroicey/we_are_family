<template>
  <div class="duration-selector">
    <button 
      v-for="duration in durations" 
      :key="duration"
      :class="['duration-button', { active: modelValue === duration }]"
      @click="$emit('update:modelValue', duration)"
    >
      {{ duration }}分钟
    </button>
  </div>
</template>

<script setup>
defineProps({
  durations: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Number,
    required: true
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.duration-selector {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.duration-button {
  padding: 8px 16px;
  border-radius: 16px;
  background: white;
  color: #666;
  font-size: 14px;
  transition: all 0.3s;
}

.duration-button.active {
  background: #07C160;
  color: white;
}
</style>

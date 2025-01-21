<template>
  <div class="timer-controls">
    <button 
      class="control-button"
      :class="{ active: isRunning }"
      @click="$emit('toggle')"
    >
      <component :is="isRunning ? Pause : Play" class="icon" />
      {{ isRunning ? '暂停' : '开始' }}
    </button>
    <button 
      class="control-button reset"
      @click="$emit('reset')"
      :disabled="!canReset"
    >
      <RotateCcw class="icon" />
      重置
    </button>
  </div>
</template>

<script setup>
import { Play, Pause, RotateCcw } from 'lucide-vue-next'

defineProps({
  isRunning: {
    type: Boolean,
    required: true
  },
  canReset: {
    type: Boolean,
    required: true
  }
})

defineEmits(['toggle', 'reset'])
</script>

<style scoped>
.timer-controls {
  display: flex;
  gap: 16px;
}

.control-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 24px;
  background: white;
  color: #07C160;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s;
}

.control-button.active {
  background: #07C160;
  color: white;
}

.control-button.reset {
  background: #f5f5f5;
  color: #666;
}

.control-button.reset:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.icon {
  width: 20px;
  height: 20px;
}
</style>

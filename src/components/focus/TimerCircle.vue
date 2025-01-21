<template>
  <div class="timer-circle" :style="{ background: circleGradient }">
    <div class="time-display">
      <span class="minutes">{{ displayMinutes }}</span>
      <span class="separator">:</span>
      <span class="seconds">{{ displaySeconds }}</span>
    </div>
    <div class="focus-text">{{ focusText }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  timeLeft: {
    type: Number,
    required: true
  },
  totalTime: {
    type: Number,
    required: true
  },
  isRunning: {
    type: Boolean,
    default: false
  }
})

const displayMinutes = computed(() => {
  return Math.floor(props.timeLeft / 60).toString().padStart(2, '0')
})

const displaySeconds = computed(() => {
  return (props.timeLeft % 60).toString().padStart(2, '0')
})

const focusText = computed(() => {
  return props.isRunning ? '专注中...' : '准备开始'
})

const circleGradient = computed(() => {
  const progress = (props.timeLeft / props.totalTime) * 100
  return `conic-gradient(
    #07C160 ${progress}%,
    #e6f7ef ${progress}%
  )`
})
</script>

<style scoped>
.timer-circle {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: background 0.3s linear;
}

.time-display {
  font-size: 48px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  margin-bottom: 8px;
}

.separator {
  animation: blink 1s infinite;
}

@keyframes blink {
  50% {
    opacity: 0.5;
  }
}

.focus-text {
  font-size: 16px;
  color: #666;
}
</style>

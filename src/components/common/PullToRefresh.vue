<template>
  <div 
    class="pull-to-refresh"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
  >
    <div 
      class="pull-down-content"
      :class="{ visible: distance > 0 }"
      :style="{ height: `${distance}px` }"
    >
      <div class="indicator" :class="{ loading: isRefreshing }">
        <RefreshCw v-if="!isRefreshing" class="icon" :style="{ transform: `rotate(${rotation}deg)` }" />
        <Loader v-else class="icon spinning" />
        <span class="text">{{ statusText }}</span>
      </div>
    </div>
    
    <div class="scroll-content" :class="{ refreshing: isRefreshing }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RefreshCw, Loader } from 'lucide-vue-next'

const props = defineProps({
  isRefreshing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['refresh'])

const distance = ref(0)
const startY = ref(0)
const threshold = 60
let canRefresh = false

const rotation = computed(() => {
  return Math.min(180, (distance.value / threshold) * 180)
})

const statusText = computed(() => {
  if (props.isRefreshing) return '刷新中...'
  if (distance.value >= threshold) return '释放刷新'
  return '下拉刷新'
})

const touchStart = (e) => {
  if (props.isRefreshing) return
  
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  if (scrollTop === 0) {
    canRefresh = true
    startY.value = e.touches[0].clientY
  }
}

const touchMove = (e) => {
  if (!canRefresh || props.isRefreshing) return
  
  const currentY = e.touches[0].clientY
  const diff = currentY - startY.value
  
  if (diff > 0) {
    e.preventDefault()
    distance.value = Math.pow(diff, 0.8) // 添加阻尼效果
  }
}

const touchEnd = () => {
  if (!canRefresh || props.isRefreshing) return
  
  if (distance.value >= threshold) {
    emit('refresh')
  }
  
  // 重置状态
  distance.value = 0
  canRefresh = false
}
</script>

<style scoped>
.pull-to-refresh {
  position: relative;
  min-height: 100vh;
}

.pull-down-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 0;
  overflow: hidden;
  transition: height 0.2s ease-out;
}

.pull-down-content.visible {
  overflow: visible;
}

.indicator {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #666;
  transform: translateY(50%);
}

.icon {
  width: 20px;
  height: 20px;
  transition: transform 0.2s ease-out;
}

.icon.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.text {
  font-size: 14px;
}

.scroll-content {
  transition: transform 0.2s ease-out;
}

.scroll-content.refreshing {
  transform: translateY(50px);
}
</style>

<template>
  <Transition name="toast">
    <div 
      v-if="visible"
      class="toast"
      :class="type"
    >
      <component 
        v-if="icon"
        :is="icon" 
        class="toast-icon"
      />
      <span class="toast-message">{{ message }}</span>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
import { 
  CheckCircle, AlertCircle, 
  AlertTriangle, Info 
} from 'lucide-vue-next'

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'info',
    validator: value => ['success', 'error', 'warning', 'info'].includes(value)
  }
})

const emit = defineEmits(['destroy'])
const visible = ref(true)

// 根据类型选择图标
const icon = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info
}[props.type]

// 关闭toast
const close = () => {
  visible.value = false
  setTimeout(() => {
    emit('destroy')
  }, 300) // 等待过渡动画完成
}

// 暴露close方法给父组件
defineExpose({ close })
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
}

.toast {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.toast-icon {
  width: 16px;
  height: 16px;
}

.toast.success {
  background: rgba(56, 142, 60, 0.9);
}

.toast.error {
  background: rgba(211, 47, 47, 0.9);
}

.toast.warning {
  background: rgba(245, 124, 0, 0.9);
}

.toast.info {
  background: rgba(2, 136, 209, 0.9);
}

/* 过渡动画 */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>

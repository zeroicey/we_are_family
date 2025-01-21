<template>
  <header class="header">
    <button v-if="showBack" class="back-button" @click="handleBack">
      <ArrowLeft />
    </button>
    <h1>{{ title }}</h1>
    <slot name="right">
      <div class="placeholder"></div>
    </slot>
  </header>
</template>

<script setup>
import { ArrowLeft } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  showBack: {
    type: Boolean,
    default: true
  }
})

const router = useRouter()

const handleBack = () => {
  router.back()
}
</script>

<style scoped>
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
</style>

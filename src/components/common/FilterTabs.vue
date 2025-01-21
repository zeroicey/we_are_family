<template>
  <div class="filter-tabs">
    <button 
      v-for="tab in tabs" 
      :key="tab.value"
      :class="['filter-tab', { active: modelValue === tab.value }]"
      @click="$emit('update:modelValue', tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  tabs: {
    type: Array,
    required: true
  },
  modelValue: {
    type: [String, Number],
    required: true
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.filter-tabs {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 5px;
}

.filter-tab {
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  color: #666;
  background: white;
  white-space: nowrap;
}

.filter-tab.active {
  background: #07C160;
  color: white;
}
</style>

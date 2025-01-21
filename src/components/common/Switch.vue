<template>
  <button 
    type="button"
    role="switch"
    class="switch"
    :class="{ 'switch-checked': modelValue }"
    :aria-checked="modelValue"
    @click="toggle"
  >
    <div class="switch-handle"></div>
  </button>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const toggle = () => {
  if (props.disabled) return
  const newValue = !props.modelValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  border: none;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
}

.switch-checked {
  background-color: #07C160;
}

.switch-handle {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.switch-checked .switch-handle {
  left: 22px;
}

.switch:focus {
  outline: none;
}

.switch:focus-visible {
  box-shadow: 0 0 0 2px rgba(7, 193, 96, 0.2);
}

.switch:active .switch-handle {
  width: 24px;
}

.switch-checked:active .switch-handle {
  left: 18px;
}

@media (hover: hover) {
  .switch:not([disabled]):hover {
    background-color: rgba(0, 0, 0, 0.35);
  }

  .switch-checked:not([disabled]):hover {
    background-color: #06b054;
  }
}

/* 禁用状态 */
.switch[disabled] {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>

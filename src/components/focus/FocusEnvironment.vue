<template>
  <div class="focus-environment">
    <div class="environment-options">
      <button 
        class="option"
        :class="{ active: ambientSound === 'none' }"
        @click="ambientSound = 'none'"
      >
        <Volume2 class="option-icon" />
        <span>安静</span>
      </button>
      <button 
        class="option"
        :class="{ active: ambientSound === 'rain' }"
        @click="ambientSound = 'rain'"
      >
        <Cloud class="option-icon" />
        <span>雨声</span>
      </button>
      <button 
        class="option"
        :class="{ active: ambientSound === 'forest' }"
        @click="ambientSound = 'forest'"
      >
        <Leaf class="option-icon" />
        <span>森林</span>
      </button>
      <button 
        class="option"
        :class="{ active: ambientSound === 'cafe' }"
        @click="ambientSound = 'cafe'"
      >
        <Coffee class="option-icon" />
        <span>咖啡馆</span>
      </button>
    </div>

    <div class="volume-control" v-if="ambientSound !== 'none'">
      <VolumeX 
        class="volume-icon" 
        :class="{ muted: currentVolume === 0 }"
        @click="currentVolume = 0"
      />
      <input 
        type="range" 
        v-model="currentVolume" 
        min="0" 
        max="100" 
        step="1"
        class="volume-slider"
      />
      <Volume2 
        class="volume-icon"
        @click="currentVolume = 100"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted, defineProps, defineEmits } from 'vue'
import { Volume2, Cloud, Leaf, Coffee, VolumeX } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: String,
    default: 'none'
  },
  volume: {
    type: Number,
    default: 50
  }
})

const emit = defineEmits(['update:modelValue', 'update:volume'])

const ambientSound = ref(props.modelValue)
const currentVolume = ref(props.volume)
const audioElement = ref(null)

// 监听环境音效变化
watch(ambientSound, (newSound) => {
  emit('update:modelValue', newSound)
  if (audioElement.value) {
    audioElement.value.pause()
    audioElement.value = null
  }
  
  if (newSound !== 'none') {
    audioElement.value = new Audio(`/sounds/${newSound}.mp3`)
    audioElement.value.loop = true
    audioElement.value.volume = currentVolume.value / 100
    try {
      audioElement.value.play().catch(err => {
        console.warn('Failed to play audio:', err)
      })
    } catch (err) {
      console.warn('Failed to play audio:', err)
    }
  }
})

// 监听音量变化
watch(currentVolume, (newVolume) => {
  emit('update:volume', newVolume)
  if (audioElement.value) {
    audioElement.value.volume = newVolume / 100
  }
})

// 监听父组件的值变化
watch(() => props.modelValue, (newValue) => {
  if (newValue !== ambientSound.value) {
    ambientSound.value = newValue
  }
})

watch(() => props.volume, (newValue) => {
  if (newValue !== currentVolume.value) {
    currentVolume.value = newValue
  }
})

// 组件卸载时停止音频
onUnmounted(() => {
  if (audioElement.value) {
    audioElement.value.pause()
    audioElement.value = null
  }
})
</script>

<style scoped>
.focus-environment {
  padding: 16px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.environment-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-radius: 8px;
  background: #f5f5f5;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.option:hover {
  background: #e0e0e0;
}

.option.active {
  background: #07C160;
  color: white;
}

.option-icon {
  width: 24px;
  height: 24px;
}

.option span {
  font-size: 12px;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 12px;
}

.volume-icon {
  width: 20px;
  height: 20px;
  color: #666;
  cursor: pointer;
}

.volume-icon.muted {
  color: #ff4d4f;
}

.volume-slider {
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: #e0e0e0;
  -webkit-appearance: none;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #07C160;
  cursor: pointer;
}
</style>

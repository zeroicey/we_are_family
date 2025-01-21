<template>
  <div class="avatar-upload">
    <div class="avatar-preview" @click="triggerUpload">
      <img v-if="preview" :src="preview" alt="Avatar Preview" class="preview-image">
      <div v-else class="upload-placeholder">
        <Upload class="upload-icon" />
        <span>点击上传头像</span>
      </div>
    </div>
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="file-input"
      @change="handleFileChange"
    >
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Upload } from 'lucide-vue-next'

const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const fileInput = ref(null)
const preview = ref(props.modelValue)

const triggerUpload = () => {
  fileInput.value.click()
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (!file) return

  // 验证文件类型
  if (!file.type.startsWith('image/')) {
    // TODO: 显示错误提示
    console.error('Please upload an image file')
    return
  }

  // 验证文件大小（2MB）
  if (file.size > 2 * 1024 * 1024) {
    // TODO: 显示错误提示
    console.error('Image size should not exceed 2MB')
    return
  }

  // 创建预览
  const reader = new FileReader()
  reader.onload = (e) => {
    preview.value = e.target.result
    emit('update:modelValue', e.target.result)
    emit('change', file)
  }
  reader.readAsDataURL(file)
}
</script>

<style scoped>
.avatar-upload {
  width: 120px;
  height: 120px;
  margin: 0 auto;
}

.avatar-preview {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px dashed #ddd;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
}

.avatar-preview:hover {
  border-color: #07C160;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  gap: 8px;
}

.upload-icon {
  width: 24px;
  height: 24px;
  color: #999;
}

.upload-placeholder span {
  font-size: 12px;
  color: #999;
}

.file-input {
  display: none;
}
</style>

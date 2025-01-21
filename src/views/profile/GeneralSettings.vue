<template>
  <div class="general-settings">
    <AppHeader title="通用设置" />
    
    <div class="content">
      <div class="settings-section">
        <h3>通知设置</h3>
        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">系统通知</span>
            <span class="setting-desc">接收系统更新和维护通知</span>
          </div>
          <Switch v-model="settings.systemNotification" />
        </div>
        
        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">求职提醒</span>
            <span class="setting-desc">接收简历被查看、面试邀请等通知</span>
          </div>
          <Switch v-model="settings.jobNotification" />
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">互助消息</span>
            <span class="setting-desc">接收结对申请、学习提醒等通知</span>
          </div>
          <Switch v-model="settings.helpNotification" />
        </div>
      </div>

      <div class="settings-section">
        <h3>界面设置</h3>
        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">深色模式</span>
            <span class="setting-desc">使用深色主题</span>
          </div>
          <Switch v-model="settings.darkMode" />
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">字体大小</span>
          </div>
          <select v-model="settings.fontSize">
            <option value="small">小</option>
            <option value="medium">中</option>
            <option value="large">大</option>
          </select>
        </div>
      </div>

      <div class="settings-section">
        <h3>专注设置</h3>
        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">专注提醒</span>
            <span class="setting-desc">每天定时提醒你开始专注</span>
          </div>
          <Switch v-model="settings.focusReminder" />
        </div>

        <div class="setting-item" v-if="settings.focusReminder">
          <div class="setting-info">
            <span class="setting-label">提醒时间</span>
          </div>
          <input type="time" v-model="settings.reminderTime" />
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">默认专注时长</span>
          </div>
          <select v-model="settings.defaultFocusDuration">
            <option value="25">25分钟</option>
            <option value="30">30分钟</option>
            <option value="45">45分钟</option>
            <option value="60">60分钟</option>
          </select>
        </div>
      </div>

      <div class="settings-section">
        <h3>存储空间</h3>
        <div class="storage-info">
          <div class="storage-bar">
            <div 
              class="storage-used" 
              :style="{ width: `${(storageUsed / storageLimit) * 100}%` }"
            ></div>
          </div>
          <div class="storage-text">
            已使用 {{ formatStorage(storageUsed) }} / {{ formatStorage(storageLimit) }}
          </div>
        </div>
        <button class="clear-btn" @click="showClearConfirm = true">
          清除缓存
        </button>
      </div>
    </div>

    <!-- 清除缓存确认对话框 -->
    <ActionDialog
      v-model:visible="showClearConfirm"
      title="清除缓存"
      :show-cancel="true"
      @confirm="handleClearCache"
    >
      <div class="clear-confirm">
        <p>确定要清除缓存吗？这将释放 {{ formatStorage(cacheSize) }} 存储空间</p>
      </div>
    </ActionDialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from '../../components/common/AppHeader.vue'
import Switch from '../../components/common/Switch.vue'
import ActionDialog from '../../components/common/ActionDialog.vue'
import { showToast } from '../../utils/toast'

const showClearConfirm = ref(false)
const storageUsed = ref(150 * 1024 * 1024) // 150MB
const storageLimit = 500 * 1024 * 1024 // 500MB
const cacheSize = ref(50 * 1024 * 1024) // 50MB

const settings = ref({
  systemNotification: true,
  jobNotification: true,
  helpNotification: true,
  darkMode: false,
  fontSize: 'medium',
  focusReminder: false,
  reminderTime: '09:00',
  defaultFocusDuration: '25'
})

const formatStorage = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB'
}

const handleClearCache = async () => {
  // TODO: 调用API清除缓存
  storageUsed.value -= cacheSize.value
  showToast('缓存已清除')
  showClearConfirm.value = false
}
</script>

<style scoped>
.general-settings {
  min-height: 100vh;
  background: #f5f5f5;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.settings-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.settings-section h3 {
  margin: 0 0 20px;
  font-size: 16px;
  color: #333;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
}

.setting-item:not(:last-child) {
  border-bottom: 1px solid #f0f0f0;
}

.setting-info {
  flex: 1;
  margin-right: 12px;
}

.setting-label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
}

.setting-desc {
  font-size: 12px;
  color: #999;
}

select, input[type="time"] {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  color: #333;
  font-size: 14px;
}

.storage-info {
  margin-bottom: 16px;
}

.storage-bar {
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.storage-used {
  height: 100%;
  background: #07C160;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.storage-text {
  font-size: 12px;
  color: #999;
  text-align: right;
}

.clear-btn {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: #f5f5f5;
}

.clear-confirm {
  padding: 0 12px;
}

.clear-confirm p {
  margin: 12px 0;
  color: #666;
}

@media (max-width: 768px) {
  .content {
    padding: 12px;
  }
  
  .settings-section {
    padding: 16px;
    margin-bottom: 12px;
  }
}
</style>

<template>
  <div class="privacy-settings">
    <AppHeader title="隐私设置" />
    
    <div class="content">
      <div class="settings-section">
        <h3>个人信息</h3>
        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">公开我的个人主页</span>
            <span class="setting-desc">其他用户可以查看你的个人主页</span>
          </div>
          <Switch v-model="settings.publicProfile" />
        </div>
        
        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">显示我的学校信息</span>
            <span class="setting-desc">在个人主页显示你的学校和专业</span>
          </div>
          <Switch v-model="settings.showSchool" />
        </div>
      </div>

      <div class="settings-section">
        <h3>求职相关</h3>
        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">公开求职状态</span>
            <span class="setting-desc">让企业了解你的求职意向</span>
          </div>
          <Switch v-model="settings.publicJobStatus" />
        </div>
        
        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">公开简历</span>
            <span class="setting-desc">企业可以主动查看你的简历</span>
          </div>
          <Switch v-model="settings.publicResume" />
        </div>
      </div>

      <div class="settings-section">
        <h3>互助学习</h3>
        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">允许陌生人发起结对</span>
            <span class="setting-desc">其他用户可以向你发送结对申请</span>
          </div>
          <Switch v-model="settings.allowPairRequest" />
        </div>
        
        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">公开学习记录</span>
            <span class="setting-desc">展示你的专注时长和学习成果</span>
          </div>
          <Switch v-model="settings.publicStudyRecord" />
        </div>
      </div>

      <div class="settings-section danger-zone">
        <h3>数据管理</h3>
        <button class="danger-btn" @click="showDeleteConfirm = true">
          删除账号
        </button>
        <p class="danger-desc">
          删除账号后，你的所有数据将被永久删除且无法恢复
        </p>
      </div>
    </div>

    <!-- 删除账号确认对话框 -->
    <ActionDialog
      v-model:visible="showDeleteConfirm"
      title="删除账号"
      :show-cancel="true"
      cancel-text="取消"
      confirm-text="确认删除"
      confirm-type="danger"
      @confirm="handleDeleteAccount"
    >
      <div class="delete-confirm">
        <p>你确定要删除账号吗？</p>
        <p>删除后将无法恢复：</p>
        <ul>
          <li>个人资料和设置</li>
          <li>简历和求职记录</li>
          <li>互助学习记录</li>
          <li>消息和通知</li>
        </ul>
      </div>
    </ActionDialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../../components/common/AppHeader.vue'
import Switch from '../../components/common/Switch.vue'
import ActionDialog from '../../components/common/ActionDialog.vue'
import { showToast } from '../../utils/toast'

const router = useRouter()
const showDeleteConfirm = ref(false)

const settings = ref({
  publicProfile: true,
  showSchool: true,
  publicJobStatus: true,
  publicResume: false,
  allowPairRequest: true,
  publicStudyRecord: true
})

const handleDeleteAccount = async () => {
  // TODO: 调用API删除账号
  showToast('账号已删除')
  router.push('/')
}
</script>

<style scoped>
.privacy-settings {
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

.danger-zone {
  margin-top: 32px;
}

.danger-btn {
  width: 100%;
  padding: 12px;
  border: 1px solid #ff4d4f;
  border-radius: 8px;
  background: white;
  color: #ff4d4f;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.danger-btn:hover {
  background: #fff1f0;
}

.danger-desc {
  margin: 12px 0 0;
  font-size: 12px;
  color: #999;
  text-align: center;
}

.delete-confirm {
  padding: 0 12px;
}

.delete-confirm p {
  margin: 12px 0;
  color: #333;
}

.delete-confirm ul {
  margin: 12px 0;
  padding-left: 20px;
  color: #666;
}

.delete-confirm li {
  margin-bottom: 8px;
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

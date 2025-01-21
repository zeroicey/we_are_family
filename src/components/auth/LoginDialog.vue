<template>
  <ActionDialog
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    title="欢迎使用"
    :show-cancel="false"
    :show-confirm="false"
    width="360px"
  >
    <div class="login-dialog">
      <img src="/logo.png" alt="Logo" class="logo" />
      <h2 class="welcome-text">让我们一起专注学习</h2>
      <p class="sub-text">登录后开启你的学习之旅</p>

      <div class="agreement-section">
        <label class="agreement-label">
          <input
            type="checkbox"
            v-model="agreedToTerms"
            class="agreement-checkbox"
          />
          <span>我已阅读并同意</span>
          <a href="#" @click.prevent="showTerms">《用户协议》</a>
          <span>和</span>
          <a href="#" @click.prevent="showPrivacy">《隐私政策》</a>
        </label>
      </div>

      <button
        class="login-button"
        :class="{ disabled: !agreedToTerms }"
        :disabled="!agreedToTerms"
        @click="handleLogin"
      >
        <img src="/wechat.svg" alt="WeChat" class="wechat-icon" />
        微信一键登录
      </button>
    </div>
  </ActionDialog>

  <!-- 用户协议对话框 -->
  <ActionDialog
    v-model:visible="showTermsDialog"
    title="用户协议"
    confirm-text="我知道了"
    :show-cancel="false"
  >
    <div class="terms-content">
      <h3>欢迎使用我们的服务</h3>
      <p>本协议是您与我们之间关于使用我们服务所订立的协议。</p>
      <!-- 添加更多协议内容 -->
    </div>
  </ActionDialog>

  <!-- 隐私政策对话框 -->
  <ActionDialog
    v-model:visible="showPrivacyDialog"
    title="隐私政策"
    confirm-text="我知道了"
    :show-cancel="false"
  >
    <div class="terms-content">
      <h3>隐私政策</h3>
      <p>我们非常重视您的隐私保护，本政策将说明我们如何收集和使用您的个人信息。</p>
      <!-- 添加更多隐私政策内容 -->
    </div>
  </ActionDialog>
</template>

<script setup>
import { ref } from 'vue'
import ActionDialog from '../common/ActionDialog.vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:visible', 'login'])

const agreedToTerms = ref(false)
const showTermsDialog = ref(false)
const showPrivacyDialog = ref(false)

const showTerms = () => {
  showTermsDialog.value = true
}

const showPrivacy = () => {
  showPrivacyDialog.value = true
}

const handleLogin = async () => {
  if (!agreedToTerms.value) return
  
  try {
    // TODO: 实现微信登录
    emit('login')
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>

<style scoped>
.login-dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
}

.welcome-text {
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin: 0 0 8px;
}

.sub-text {
  font-size: 14px;
  color: #666;
  margin: 0 0 24px;
}

.agreement-section {
  margin-bottom: 24px;
  width: 100%;
}

.agreement-label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #666;
}

.agreement-checkbox {
  width: 16px;
  height: 16px;
  margin: 0;
}

.agreement-label a {
  color: #07C160;
  text-decoration: none;
}

.agreement-label a:hover {
  text-decoration: underline;
}

.login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #07C160;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.login-button:hover {
  background: #06ae56;
}

.login-button.disabled {
  background: #ccc;
  cursor: not-allowed;
}

.wechat-icon {
  width: 24px;
  height: 24px;
}

.terms-content {
  padding: 0 12px;
}

.terms-content h3 {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0 0 16px;
}

.terms-content p {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0 0 12px;
}
</style>

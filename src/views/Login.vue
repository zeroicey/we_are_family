<template>
  <div class="login-container">
    <div class="logo-container">
      <img src="/logo.png" alt="互成一家" class="logo" />
    </div>
    <button class="wechat-login-btn">
      <MessageCircle class="wechat-icon" />
      微信登录
    </button>
    <p class="agreement-text">
      首次使用微信登录即代表同意
      <a href="#" class="agreement-link">用户协议</a>
    </p>
  </div>
</template>

<script setup>
import { MessageCircle } from 'lucide-vue-next'
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f5f5f5;
}

.logo-container {
  margin-bottom: 40px;
}

.logo {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.wechat-login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  max-width: 300px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #07C160;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
}

.wechat-login-btn:hover {
  opacity: 0.9;
}

.wechat-icon {
  margin-right: 8px;
  width: 20px;
  height: 20px;
}

.agreement-text {
  margin-top: 16px;
  font-size: 12px;
  color: #666;
}

.agreement-link {
  color: #07C160;
  text-decoration: none;
}

.agreement-link:hover {
  text-decoration: underline;
}
</style>

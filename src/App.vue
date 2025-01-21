<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TabBar from './components/common/TabBar.vue'
import LoginDialog from './components/auth/LoginDialog.vue'

const router = useRouter()
const route = useRoute()

const showLoginDialog = ref(false)

// 检查是否需要显示底部导航栏
const showTabBar = computed(() => {
  return !route.meta.hideTabBar
})

// 检查登录状态
const checkLoginStatus = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    showLoginDialog.value = true
  }
}

// 处理登录成功
const handleLogin = () => {
  // TODO: 处理微信登录回调
  showLoginDialog.value = false
  
  // 存储登录状态
  localStorage.setItem('token', 'dummy-token')
  
  // 获取重定向路径
  const redirectPath = localStorage.getItem('redirectPath')
  if (redirectPath) {
    localStorage.removeItem('redirectPath')
    router.replace(redirectPath)
  }
}

onMounted(() => {
  checkLoginStatus()
})
</script>

<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <TabBar v-if="showTabBar" />
    
    <LoginDialog
      v-model:visible="showLoginDialog"
      @login="handleLogin"
    />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
}

.app {
  min-height: 100vh;
  background: #f5f5f5;
}

.page-content {
  padding-bottom: 56px;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  font: inherit;
}

button:focus {
  outline: none;
}

:root {
  --primary-color: #07C160;
  --danger-color: #ff4d4f;
  --warning-color: #faad14;
  --text-primary: #333333;
  --text-secondary: #666666;
  --text-tertiary: #999999;
  --border-color: #e8e8e8;
  --background-color: #f5f5f5;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-primary);
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
}
</style>

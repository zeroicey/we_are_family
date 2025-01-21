<template>
  <nav class="tab-bar">
    <router-link 
      v-for="tab in tabs" 
      :key="tab.path"
      :to="tab.path"
      class="tab-item"
      :class="{ active: currentPath === tab.path }"
    >
      <component :is="tab.icon" class="icon" />
      <span class="label">{{ tab.label }}</span>
    </router-link>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Home, Timer, Users, Briefcase, User } from 'lucide-vue-next'

const route = useRoute()
const currentPath = computed(() => route.path)

const tabs = [
  {
    label: '首页',
    path: '/',
    icon: Home
  },
  {
    label: '专注',
    path: '/focus',
    icon: Timer
  },
  {
    label: '互助',
    path: '/community',
    icon: Users
  },
  {
    label: '招聘',
    path: '/jobs',
    icon: Briefcase
  },
  {
    label: '我的',
    path: '/profile',
    icon: User
  }
]
</script>

<style scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #eee;
  padding-bottom: env(safe-area-inset-bottom);
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  text-decoration: none;
  font-size: 12px;
  gap: 4px;
  padding: 4px 0;
}

.tab-item.active {
  color: #07C160;
}

.icon {
  width: 24px;
  height: 24px;
}

.label {
  line-height: 1.2;
}
</style>

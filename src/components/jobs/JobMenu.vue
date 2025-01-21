<template>
  <nav class="job-menu">
    <RouterLink 
      v-for="item in menuItems" 
      :key="item.path"
      :to="item.path"
      class="menu-item"
      active-class="active"
    >
      <component :is="item.icon" class="menu-icon" />
      <span>{{ item.label }}</span>
      <span v-if="item.count" class="count">{{ item.count }}</span>
    </RouterLink>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Briefcase, BookmarkCheck, ClipboardList } from 'lucide-vue-next'

const props = defineProps({
  applicationCount: {
    type: Number,
    default: 0
  },
  favoriteCount: {
    type: Number,
    default: 0
  }
})

const menuItems = computed(() => [
  {
    path: '/jobs',
    label: '职位列表',
    icon: Briefcase
  },
  {
    path: '/jobs/applications',
    label: '我的投递',
    icon: ClipboardList,
    count: props.applicationCount || null
  },
  {
    path: '/jobs/favorites',
    label: '我的收藏',
    icon: BookmarkCheck,
    count: props.favoriteCount || null
  }
])
</script>

<style scoped>
.job-menu {
  display: flex;
  gap: 12px;
  padding: 12px 20px;
  background: white;
  border-bottom: 1px solid #f0f0f0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.job-menu::-webkit-scrollbar {
  display: none;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  color: #666;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.menu-item:hover {
  background: #f5f5f5;
}

.menu-item.active {
  background: #07C160;
  color: white;
}

.menu-icon {
  width: 16px;
  height: 16px;
}

.count {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 18px;
  height: 18px;
  padding: 0 6px;
  border-radius: 9px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}

.menu-item.active .count {
  background: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .job-menu {
    padding: 8px 12px;
  }
  
  .menu-item {
    padding: 6px 12px;
    font-size: 12px;
  }
  
  .menu-icon {
    width: 14px;
    height: 14px;
  }
}
</style>

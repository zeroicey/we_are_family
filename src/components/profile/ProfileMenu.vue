<template>
  <div class="profile-menu">
    <div 
      v-for="group in menuGroups" 
      :key="group.title" 
      class="menu-group"
    >
      <h3 class="group-title">{{ group.title }}</h3>
      <div class="menu-items">
        <div 
          v-for="item in group.items" 
          :key="item.label"
          class="menu-item"
          @click="handleItemClick(item)"
        >
          <div class="item-left">
            <component :is="item.icon" class="item-icon" :style="{ color: item.iconColor }" />
            <span class="item-label">{{ item.label }}</span>
          </div>
          <div class="item-right">
            <span v-if="item.value" class="item-value">{{ item.value }}</span>
            <ChevronRight class="arrow-icon" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  FileText, Settings, Bell, HelpCircle, 
  Share2, Heart, ChevronRight, MessageCircle,
  Shield, LogOut
} from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits(['logout'])

const menuGroups = [
  {
    title: '我的档案',
    items: [
      {
        label: '个人简历',
        icon: FileText,
        iconColor: '#1976D2',
        path: '/profile/resume'
      },
      {
        label: '求职意向',
        icon: Heart,
        iconColor: '#E91E63',
        path: '/profile/job-preferences'
      },
      {
        label: '求职进度',
        icon: Share2,
        iconColor: '#00796B',
        value: '2个在投',
        path: '/jobs/applications'
      }
    ]
  },
  {
    title: '消息中心',
    items: [
      {
        label: '系统通知',
        icon: Bell,
        iconColor: '#FF9800',
        value: '2条未读',
        path: '/profile/notifications'
      },
      {
        label: '互助消息',
        icon: MessageCircle,
        iconColor: '#4CAF50',
        value: '1条未读',
        path: '/profile/messages'
      }
    ]
  },
  {
    title: '设置',
    items: [
      {
        label: '隐私设置',
        icon: Shield,
        iconColor: '#7B1FA2',
        path: '/profile/privacy'
      },
      {
        label: '通用设置',
        icon: Settings,
        iconColor: '#455A64',
        path: '/profile/settings'
      },
      {
        label: '帮助与反馈',
        icon: HelpCircle,
        iconColor: '#00ACC1',
        path: '/profile/help'
      },
      {
        label: '退出登录',
        icon: LogOut,
        iconColor: '#D32F2F',
        action: 'logout'
      }
    ]
  }
]

const handleItemClick = (item) => {
  if (item.action === 'logout') {
    emit('logout')
  } else if (item.path) {
    router.push(item.path)
  }
}
</script>

<style scoped>
.profile-menu {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.menu-group {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.group-title {
  padding: 16px 20px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
}

.menu-items {
  display: flex;
  flex-direction: column;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.menu-item:hover {
  background: #f9f9f9;
}

.menu-item:not(:last-child) {
  border-bottom: 1px solid #f0f0f0;
}

.item-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.item-icon {
  width: 20px;
  height: 20px;
}

.item-label {
  font-size: 14px;
  color: #333;
}

.item-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.item-value {
  font-size: 14px;
  color: #666;
}

.arrow-icon {
  width: 16px;
  height: 16px;
  color: #999;
}

@media (max-width: 768px) {
  .menu-group {
    border-radius: 0;
  }
  
  .group-title {
    padding: 12px 16px;
  }
  
  .menu-item {
    padding: 12px 16px;
  }
}
</style>

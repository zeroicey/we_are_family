<template>
  <div class="profile-view">
    <AppHeader title="个人中心" :show-back="false" />
    <div class="content">
      <ProfileCard
        :user="user"
        @edit="handleEdit"
      />
      <ProfileMenu @logout="handleLogout" />
    </div>

    <ActionDialog
      v-model:visible="showLogoutDialog"
      title="退出登录"
      confirm-text="确认退出"
      @confirm="confirmLogout"
    >
      <div class="logout-content">
        <p>确认要退出登录吗？</p>
      </div>
    </ActionDialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/common/AppHeader.vue'
import ProfileCard from '../components/profile/ProfileCard.vue'
import ProfileMenu from '../components/profile/ProfileMenu.vue'
import ActionDialog from '../components/common/ActionDialog.vue'

const router = useRouter()
const showLogoutDialog = ref(false)

// 模拟用户数据
const user = ref({
  name: '张同学',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  school: '广东东软学院',
  major: '软件工程',
  grade: '大三',
  location: '广东',
  bio: '热爱技术，对互联网充满热情。希望在校招中找到理想的工作。',
  helpHours: 28,
  applicationCount: 4,
  favoriteCount: 2
})

const handleEdit = () => {
  router.push('/profile/edit')
}

const handleLogout = () => {
  showLogoutDialog.value = true
}

const confirmLogout = async () => {
  try {
    // 模拟退出登录请求
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 清除用户信息
    // TODO: 清除用户token和其他信息
    
    // 跳转到登录页
    router.push('/login')
  } catch (error) {
    console.error('Failed to logout:', error)
    // TODO: 显示退出失败提示
  }
}
</script>

<style scoped>
.profile-view {
  min-height: 100vh;
  background: #f5f5f5;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.logout-content {
  text-align: center;
  padding: 12px 0;
}

@media (max-width: 768px) {
  .content {
    padding: 12px;
  }
}
</style>

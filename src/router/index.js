import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Help from '../views/Help.vue'
import Resume from '../views/profile/Resume.vue'
import ResumeEdit from '../views/profile/ResumeEdit.vue'
import Messages from '../views/profile/Messages.vue'
import Notifications from '../views/profile/Notifications.vue'
import JobPreferences from '../views/profile/JobPreferences.vue'
import PrivacySettings from '../views/profile/PrivacySettings.vue'
import GeneralSettings from '../views/profile/GeneralSettings.vue'
import HelpView from '../views/profile/Help.vue'
import FocusTimer from '../views/focus/FocusTimer.vue'
import FocusRecord from '../views/focus/FocusRecord.vue'

// Jobs 模块
import Jobs from '../views/Jobs.vue'
import JobDetail from '../views/JobDetail.vue'
import JobApplications from '../views/JobApplications.vue'
import JobFavorites from '../views/JobFavorites.vue'

// Community 模块
import Community from '../views/Community.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    // Jobs 模块路由
    {
      path: '/jobs',
      name: 'jobs',
      component: Jobs,
      meta: { requiresAuth: true }
    },
    {
      path: '/jobs/:id',
      name: 'job-detail',
      component: JobDetail,
      meta: { requiresAuth: true }
    },
    {
      path: '/jobs/applications',
      name: 'job-applications',
      component: JobApplications,
      meta: { requiresAuth: true }
    },
    {
      path: '/jobs/favorites',
      name: 'job-favorites',
      component: JobFavorites,
      meta: { requiresAuth: true }
    },
    // Community 模块路由
    {
      path: '/community',
      name: 'community',
      component: Community,
      meta: { requiresAuth: true }
    },
    // Profile 模块路由
    {
      path: '/profile/resume',
      name: 'resume',
      component: Resume,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/resume/edit',
      name: 'resume-edit',
      component: ResumeEdit,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/messages',
      name: 'messages',
      component: Messages,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/notifications',
      name: 'notifications',
      component: Notifications,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/job-preferences',
      name: 'job-preferences',
      component: JobPreferences,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/privacy',
      name: 'privacy',
      component: PrivacySettings,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/settings',
      name: 'settings',
      component: GeneralSettings,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/help',
      name: 'help-feedback',
      component: HelpView,
      meta: { requiresAuth: true }
    },
    // Focus 模块路由
    {
      path: '/focus',
      name: 'focus',
      component: FocusTimer,
      meta: { requiresAuth: true }
    },
    {
      path: '/focus/record',
      name: 'focus-record',
      component: FocusRecord,
      meta: { requiresAuth: true }
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  // 如果路由需要认证且没有token，显示登录对话框
  if (to.meta.requiresAuth && !token) {
    // 将目标路由信息存储到localStorage
    localStorage.setItem('redirectPath', to.fullPath)
    // 允许导航继续，登录对话框会在App.vue中显示
    next()
  } else {
    next()
  }
})

export default router

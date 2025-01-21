<template>
  <div class="activity-list">
    <div class="filters">
      <div class="filter-chips">
        <button 
          v-for="category in categories" 
          :key="category.type"
          class="chip"
          :class="{ active: selectedCategory === category.type }"
          @click="selectedCategory = category.type"
        >
          <component :is="category.icon" class="chip-icon" />
          {{ category.label }}
        </button>
      </div>
    </div>
    
    <div class="activities">
      <template v-if="!isLoading">
        <ActivityCard
          v-for="activity in filteredActivities"
          :key="activity.id"
          :activity="activity"
          @update:activity="handleActivityUpdate"
        />
      </template>
      <template v-else>
        <ActivityCardSkeleton v-for="n in 3" :key="n" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { BookOpen, Coffee, Dumbbell } from 'lucide-vue-next'
import ActivityCard from './ActivityCard.vue'
import ActivityCardSkeleton from './ActivityCardSkeleton.vue'

const selectedCategory = ref('all')
const isLoading = ref(true)

const categories = [
  {
    type: 'all',
    label: '全部',
    icon: BookOpen
  },
  {
    type: 'study',
    label: '学习',
    icon: BookOpen
  },
  {
    type: 'chat',
    label: '倾诉',
    icon: Coffee
  },
  {
    type: 'exercise',
    label: '运动',
    icon: Dumbbell
  }
]

// Mock activities data
const activities = ref([
  {
    id: 1,
    userName: '小明',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    title: '考研互助小组',
    description: '有没有准备考研的同学，一起组队互相监督呀~ 我准备考浙大计算机，最近在刷数学，找个一起学习的伙伴。每天打卡，互相分享学习进度和心得，一起进步！如果你也在准备考研，或者有相关经验，欢迎加入我们~',
    time: '10分钟前',
    category: {
      type: 'study',
      label: '学习'
    },
    location: '图书馆',
    commentCount: 5,
    likeCount: 12,
    isLiked: true,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    userName: '小红',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    title: '找人聊天',
    description: '想找人聊聊天，最近压力有点大，需要一个倾诉的对象。期末考试快到了，感觉自己准备得不够充分，很焦虑。希望能找到同样有这种感受的朋友，互相开导一下~',
    time: '30分钟前',
    category: {
      type: 'chat',
      label: '倾诉'
    },
    commentCount: 3,
    likeCount: 8,
    isLiked: false
  },
  {
    id: 3,
    userName: '小强',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dusty',
    title: '晨跑小队招募',
    description: '每天早上6:30在操场集合，一起晨跑，坚持打卡，互相监督！已经坚持了一周了，感觉精神状态好了很多。希望能找到更多志同道合的伙伴，一起享受晨跑的快乐~',
    time: '1小时前',
    category: {
      type: 'exercise',
      label: '运动'
    },
    location: '校园操场',
    commentCount: 15,
    likeCount: 28,
    isLiked: false,
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop'
  }
])

const filteredActivities = computed(() => {
  if (selectedCategory.value === 'all') {
    return activities.value
  }
  return activities.value.filter(activity => 
    activity.category.type === selectedCategory.value
  )
})

// 模拟加载效果
setTimeout(() => {
  isLoading.value = false
}, 1500)

// 处理活动更新（比如点赞）
const handleActivityUpdate = (updatedActivity) => {
  const index = activities.value.findIndex(a => a.id === updatedActivity.id)
  if (index !== -1) {
    activities.value[index] = updatedActivity
  }
}
</script>

<style scoped>
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.filters {
  position: sticky;
  top: 0;
  background: white;
  padding: 12px 0;
  z-index: 1;
}

.filter-chips {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.filter-chips::-webkit-scrollbar {
  display: none;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  background: #f5f5f5;
  color: #666;
  border: none;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
}

.chip:hover {
  background: #e0e0e0;
}

.chip.active {
  background: #07C160;
  color: white;
}

.chip-icon {
  width: 16px;
  height: 16px;
}

.activities {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>

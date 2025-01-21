<template>
  <div class="help-view">
    <AppHeader title="互助" />
    
    <div class="content">
      <!-- 搜索和筛选区域 -->
      <div class="search-section">
        <div class="search-box">
          <Search class="search-icon" />
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="搜索学习伙伴..."
          />
        </div>
        <div class="filter-tags">
          <div 
            v-for="tag in filterTags"
            :key="tag.value"
            class="filter-tag"
            :class="{ active: selectedTags.includes(tag.value) }"
            @click="toggleTag(tag.value)"
          >
            {{ tag.label }}
          </div>
        </div>
      </div>

      <!-- 互助列表 -->
      <div class="help-list">
        <HelpCard
          v-for="item in filteredHelpItems"
          :key="item.id"
          :data="item"
          @click="handleCardClick(item)"
        />
      </div>

      <!-- 发起互助按钮 -->
      <button class="create-btn" @click="showCreateDialog = true">
        <Plus class="create-icon" />
        发起互助
      </button>
    </div>

    <!-- 创建互助对话框 -->
    <CreateHelpDialog
      :visible="showCreateDialog"
      @update:visible="showCreateDialog = $event"
      @success="handleCreateSuccess"
    />

    <!-- 互助详情对话框 -->
    <HelpDetailDialog
      v-if="selectedHelp"
      :visible="showDetailDialog"
      @update:visible="showDetailDialog = $event"
      :data="selectedHelp"
      @apply="handleApply"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, Plus } from 'lucide-vue-next'
import AppHeader from '../components/common/AppHeader.vue'
import HelpCard from '../components/help/HelpCard.vue'
import CreateHelpDialog from '../components/help/CreateHelpDialog.vue'
import HelpDetailDialog from '../components/help/HelpDetailDialog.vue'
import { showToast } from '../utils/toast'

const searchQuery = ref('')
const selectedTags = ref([])
const showCreateDialog = ref(false)
const showDetailDialog = ref(false)
const selectedHelp = ref(null)

// 筛选标签
const filterTags = [
  { label: '算法', value: 'algorithm' },
  { label: '前端', value: 'frontend' },
  { label: '后端', value: 'backend' },
  { label: '面试', value: 'interview' },
  { label: '项目', value: 'project' },
  { label: '英语', value: 'english' }
]

// 模拟数据
const helpItems = ref([
  {
    id: 1,
    title: '找人一起刷算法题',
    tags: ['algorithm', 'interview'],
    description: '准备秋招，想找个伙伴一起刷力扣，互相监督，每天至少一题。',
    creator: {
      name: '李同学',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lily',
      school: '广东东软学院',
      major: '软件工程'
    },
    schedule: {
      frequency: '每天',
      timeSlot: '晚上8点-10点'
    },
    duration: '3个月',
    memberLimit: 2,
    currentMembers: 1,
    createdAt: '2024-01-21 20:30'
  },
  {
    id: 2,
    title: '前端项目结对编程',
    tags: ['frontend', 'project'],
    description: '正在做一个Vue3+Vite的项目，想找个伙伴一起开发，互相学习和code review。',
    creator: {
      name: '张同学',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      school: '广东东软学院',
      major: '软件工程'
    },
    schedule: {
      frequency: '每周三次',
      timeSlot: '下午2点-5点'
    },
    duration: '2个月',
    memberLimit: 2,
    currentMembers: 1,
    createdAt: '2024-01-21 18:45'
  },
  {
    id: 3,
    title: '英语口语练习小组',
    tags: ['english', 'interview'],
    description: '准备面试英语，想找几个伙伴一起练习口语，模拟面试场景。',
    creator: {
      name: '王同学',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      school: '广东东软学院',
      major: '软件工程'
    },
    schedule: {
      frequency: '每周两次',
      timeSlot: '晚上7点-9点'
    },
    duration: '1个月',
    memberLimit: 4,
    currentMembers: 2,
    createdAt: '2024-01-21 15:20'
  }
])

// 根据搜索和标签筛选
const filteredHelpItems = computed(() => {
  let filtered = helpItems.value

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    )
  }

  // 标签过滤
  if (selectedTags.value.length > 0) {
    filtered = filtered.filter(item =>
      item.tags.some(tag => selectedTags.value.includes(tag))
    )
  }

  return filtered
})

// 切换标签
const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag)
  if (index === -1) {
    selectedTags.value.push(tag)
  } else {
    selectedTags.value.splice(index, 1)
  }
}

// 点击卡片
const handleCardClick = (item) => {
  selectedHelp.value = item
  showDetailDialog.value = true
}

// 创建成功
const handleCreateSuccess = (newHelp) => {
  helpItems.value.unshift({
    id: Date.now(),
    ...newHelp,
    creator: {
      name: '我',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Me',
      school: '广东东软学院',
      major: '软件工程'
    },
    currentMembers: 1,
    createdAt: new Date().toLocaleString()
  })
  showToast('创建成功', { type: 'success' })
}

// 申请加入
const handleApply = (item) => {
  showToast('申请已发送', { type: 'success' })
  showDetailDialog.value = false
}
</script>

<style scoped>
.help-view {
  min-height: 100vh;
  background: #f5f5f5;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.search-section {
  margin-bottom: 20px;
}

.search-box {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
  margin-bottom: 12px;
}

.search-icon {
  width: 20px;
  height: 20px;
  color: #999;
  margin-right: 8px;
}

.search-box input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
}

.filter-tags {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 4px 0;
  -webkit-overflow-scrolling: touch;
}

.filter-tag {
  padding: 6px 12px;
  border-radius: 16px;
  background: white;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.filter-tag:hover {
  background: #f0f0f0;
}

.filter-tag.active {
  background: #07C160;
  color: white;
}

.help-list {
  display: grid;
  gap: 16px;
  margin-bottom: 80px;
}

.create-btn {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 24px;
  background: #07C160;
  color: white;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(7, 193, 96, 0.3);
  transition: all 0.2s;
}

.create-btn:hover {
  transform: translateX(-50%) translateY(-2px);
  box-shadow: 0 6px 16px rgba(7, 193, 96, 0.4);
}

.create-icon {
  width: 20px;
  height: 20px;
}

@media (max-width: 768px) {
  .content {
    padding: 12px;
  }
  
  .help-list {
    margin-bottom: 100px;
  }
}
</style>

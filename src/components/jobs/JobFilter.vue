<template>
  <div class="job-filter">
    <div class="search-bar">
      <Search class="search-icon" />
      <input 
        type="text" 
        v-model="searchQuery"
        placeholder="搜索职位名称、公司名称"
        @input="handleSearch"
      >
    </div>

    <div class="filter-section">
      <div class="filter-group" v-for="group in filterGroups" :key="group.name">
        <div class="group-name">{{ group.name }}</div>
        <div class="group-options">
          <button
            v-for="option in group.options"
            :key="option.value"
            class="option-btn"
            :class="{ active: isOptionSelected(group.key, option.value) }"
            @click="toggleOption(group.key, option.value)"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Search } from 'lucide-vue-next'

const props = defineProps({
  filters: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:filters', 'search'])

const searchQuery = ref('')
const selectedFilters = ref({ ...props.filters })

const filterGroups = [
  {
    name: '工作性质',
    key: 'jobType',
    options: [
      { label: '全职', value: 'fulltime' },
      { label: '实习', value: 'intern' },
      { label: '校招', value: 'campus' }
    ]
  },
  {
    name: '工作地点',
    key: 'location',
    options: [
      { label: '北京', value: 'beijing' },
      { label: '上海', value: 'shanghai' },
      { label: '深圳', value: 'shenzhen' },
      { label: '杭州', value: 'hangzhou' },
      { label: '广州', value: 'guangzhou' }
    ]
  },
  {
    name: '学历要求',
    key: 'education',
    options: [
      { label: '不限', value: 'any' },
      { label: '本科', value: 'bachelor' },
      { label: '硕士', value: 'master' },
      { label: '博士', value: 'phd' }
    ]
  },
  {
    name: '发布时间',
    key: 'postTime',
    options: [
      { label: '不限', value: 'any' },
      { label: '今天', value: 'today' },
      { label: '三天内', value: '3days' },
      { label: '一周内', value: 'week' }
    ]
  }
]

const isOptionSelected = (groupKey, value) => {
  return selectedFilters.value[groupKey] === value
}

const toggleOption = (groupKey, value) => {
  if (selectedFilters.value[groupKey] === value) {
    selectedFilters.value[groupKey] = null
  } else {
    selectedFilters.value[groupKey] = value
  }
}

const handleSearch = () => {
  emit('search', searchQuery.value)
}

watch(selectedFilters, (newFilters) => {
  emit('update:filters', newFilters)
}, { deep: true })
</script>

<style scoped>
.job-filter {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
}

.search-icon {
  width: 20px;
  height: 20px;
  color: #999;
}

.search-bar input {
  flex: 1;
  border: none;
  background: none;
  font-size: 14px;
  color: #333;
  outline: none;
}

.search-bar input::placeholder {
  color: #999;
}

.filter-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.group-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.group-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.option-btn {
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  background: #f5f5f5;
  color: #666;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.option-btn:hover {
  background: #e0e0e0;
}

.option-btn.active {
  background: #07C160;
  color: white;
}
</style>

<template>
  <div class="jobs-view">
    <AppHeader title="校园招聘" :show-back="false" />
    <JobMenu :application-count="4" :favorite-count="2" />
    <div class="content">
      <aside class="filters">
        <JobFilter
          v-model:filters="filters"
          @search="handleSearch"
        />
      </aside>
      <main class="main">
        <JobList
          :filters="filters"
          :search-query="searchQuery"
          @select="handleJobSelect"
        />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from '../components/common/AppHeader.vue'
import JobMenu from '../components/jobs/JobMenu.vue'
import JobFilter from '../components/jobs/JobFilter.vue'
import JobList from '../components/jobs/JobList.vue'

const filters = ref({})
const searchQuery = ref('')

const handleSearch = (query) => {
  searchQuery.value = query
}

const handleJobSelect = (job) => {
  // TODO: 显示职位详情
  console.log('Selected job:', job)
}
</script>

<style scoped>
.jobs-view {
  min-height: 100vh;
  background: #f5f5f5;
}

.content {
  display: flex;
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.filters {
  width: 280px;
  flex-shrink: 0;
}

.main {
  flex: 1;
  min-width: 0;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
    padding: 12px;
  }

  .filters {
    width: 100%;
  }
}
</style>

<template>
  <div class="job-card" @click="handleClick">
    <div class="company-info">
      <img :src="job.companyLogo" :alt="job.companyName" class="company-logo">
      <div class="company-meta">
        <h3 class="company-name">{{ job.companyName }}</h3>
        <div class="company-tags">
          <span class="tag">{{ job.companySize }}</span>
          <span class="tag">{{ job.companyType }}</span>
        </div>
      </div>
    </div>
    
    <div class="job-info">
      <div class="job-header">
        <h4 class="job-title">{{ job.title }}</h4>
        <span class="job-salary">{{ job.salary }}</span>
      </div>
      
      <div class="job-tags">
        <span class="tag" v-for="tag in job.tags" :key="tag">{{ tag }}</span>
      </div>
      
      <div class="job-meta">
        <div class="meta-items">
          <MapPin class="meta-icon" />
          <span>{{ job.location }}</span>
        </div>
        <div class="meta-items">
          <GraduationCap class="meta-icon" />
          <span>{{ job.education }}</span>
        </div>
        <div class="meta-items">
          <Clock class="meta-icon" />
          <span>{{ job.postTime }}</span>
        </div>
      </div>
      
      <div class="job-highlights" v-if="job.highlights">
        <div 
          class="highlight-item"
          v-for="highlight in job.highlights" 
          :key="highlight.label"
        >
          <component :is="highlight.icon" class="highlight-icon" />
          <span>{{ highlight.label }}</span>
        </div>
      </div>
    </div>

    <div class="job-status">
      <span class="status-tag" :class="job.status">{{ job.statusText }}</span>
      <button class="action-btn" :class="{ applied: job.hasApplied }">
        {{ job.hasApplied ? '已投递' : '立即投递' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { MapPin, GraduationCap, Clock } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const props = defineProps({
  job: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const handleClick = () => {
  router.push({
    name: 'JobDetail',
    params: { id: props.job.id }
  })
}

const emit = defineEmits(['click'])

</script>

<style scoped>
.job-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.job-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.company-info {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.company-logo {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
}

.company-meta {
  flex: 1;
}

.company-name {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #333;
}

.company-tags {
  display: flex;
  gap: 8px;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.job-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.job-salary {
  font-size: 16px;
  font-weight: 600;
  color: #FF4081;
}

.job-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.tag {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background: #f5f5f5;
  color: #666;
}

.job-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  color: #666;
}

.meta-items {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
}

.meta-icon {
  width: 16px;
  height: 16px;
}

.job-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
  padding: 12px;
  background: #f8f8f8;
  border-radius: 8px;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #07C160;
}

.highlight-icon {
  width: 16px;
  height: 16px;
}

.job-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-tag {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-tag.urgent {
  background: #FFF3E0;
  color: #EF6C00;
}

.status-tag.new {
  background: #E8F5E9;
  color: #2E7D32;
}

.action-btn {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  background: #07C160;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #06a152;
}

.action-btn.applied {
  background: #f5f5f5;
  color: #999;
  cursor: default;
}
</style>

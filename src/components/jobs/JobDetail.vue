<template>
  <div class="job-detail">
    <div class="header">
      <div class="company-info">
        <img :src="job.companyLogo" :alt="job.companyName" class="company-logo">
        <div class="company-meta">
          <h2 class="company-name">{{ job.companyName }}</h2>
          <div class="company-tags">
            <span class="tag">{{ job.companySize }}</span>
            <span class="tag">{{ job.companyType }}</span>
            <span class="tag">{{ job.companyStatus }}</span>
          </div>
        </div>
      </div>
      
      <div class="job-header">
        <div class="job-title-wrap">
          <h1 class="job-title">{{ job.title }}</h1>
          <span class="job-status" :class="job.status">{{ job.statusText }}</span>
        </div>
        <div class="job-meta">
          <div class="salary">{{ job.salary }}</div>
          <div class="meta-items">
            <div class="meta-item">
              <MapPin class="meta-icon" />
              <span>{{ job.location }}</span>
            </div>
            <div class="meta-item">
              <GraduationCap class="meta-icon" />
              <span>{{ job.education }}</span>
            </div>
            <div class="meta-item">
              <Clock class="meta-icon" />
              <span>{{ job.postTime }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <section class="section">
        <h3 class="section-title">职位亮点</h3>
        <div class="highlights">
          <div 
            class="highlight-item"
            v-for="highlight in job.highlights" 
            :key="highlight.label"
          >
            <component :is="highlight.icon" class="highlight-icon" />
            <span>{{ highlight.label }}</span>
          </div>
        </div>
      </section>

      <section class="section">
        <h3 class="section-title">职位描述</h3>
        <div class="description" v-html="job.description"></div>
      </section>

      <section class="section">
        <h3 class="section-title">岗位要求</h3>
        <div class="requirements" v-html="job.requirements"></div>
      </section>

      <section class="section">
        <h3 class="section-title">工作地址</h3>
        <div class="address">
          <MapPin class="address-icon" />
          <div class="address-info">
            <div class="address-text">{{ job.address }}</div>
            <div class="address-detail">{{ job.addressDetail }}</div>
          </div>
        </div>
      </section>
    </div>

    <div class="actions">
      <button 
        class="action-btn collect"
        :class="{ active: job.isCollected }"
        @click="toggleCollect"
      >
        <Star class="btn-icon" :fill="job.isCollected ? 'currentColor' : 'none'" />
        {{ job.isCollected ? '已收藏' : '收藏' }}
      </button>
      <button 
        class="action-btn apply"
        :class="{ applied: job.hasApplied }"
        @click="handleApply"
        :disabled="job.hasApplied"
      >
        {{ job.hasApplied ? '已投递' : '立即投递' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { MapPin, GraduationCap, Clock, Star } from 'lucide-vue-next'

const props = defineProps({
  job: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['collect', 'apply'])

const toggleCollect = () => {
  emit('collect', !props.job.isCollected)
}

const handleApply = () => {
  if (!props.job.hasApplied) {
    emit('apply')
  }
}
</script>

<style scoped>
.job-detail {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.header {
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
}

.company-info {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.company-logo {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
}

.company-meta {
  flex: 1;
}

.company-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.company-tags {
  display: flex;
  gap: 8px;
}

.tag {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background: #f5f5f5;
  color: #666;
}

.job-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.job-title-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.job-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.job-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.job-status.urgent {
  background: #FFF3E0;
  color: #EF6C00;
}

.job-status.new {
  background: #E8F5E9;
  color: #2E7D32;
}

.job-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.salary {
  font-size: 20px;
  font-weight: 600;
  color: #FF4081;
}

.meta-items {
  display: flex;
  gap: 24px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #666;
}

.meta-icon {
  width: 16px;
  height: 16px;
}

.content {
  padding: 24px;
}

.section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
  background: #f8f8f8;
  border-radius: 8px;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #07C160;
}

.highlight-icon {
  width: 20px;
  height: 20px;
}

.description, .requirements {
  font-size: 14px;
  line-height: 1.6;
  color: #666;
}

.description :deep(p), .requirements :deep(p) {
  margin-bottom: 12px;
}

.description :deep(ul), .requirements :deep(ul) {
  padding-left: 20px;
  margin-bottom: 12px;
}

.address {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #f8f8f8;
  border-radius: 8px;
}

.address-icon {
  width: 20px;
  height: 20px;
  color: #666;
}

.address-info {
  flex: 1;
}

.address-text {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
}

.address-detail {
  font-size: 12px;
  color: #999;
}

.actions {
  position: sticky;
  bottom: 0;
  display: flex;
  gap: 16px;
  padding: 16px 24px;
  background: white;
  border-top: 1px solid #f0f0f0;
}

.action-btn {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 44px;
  border-radius: 22px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn.collect {
  background: #f5f5f5;
  color: #666;
}

.action-btn.collect:hover {
  background: #e0e0e0;
}

.action-btn.collect.active {
  background: #FFF3E0;
  color: #EF6C00;
}

.action-btn.apply {
  background: #07C160;
  color: white;
}

.action-btn.apply:hover {
  background: #06a152;
}

.action-btn.apply.applied {
  background: #f5f5f5;
  color: #999;
  cursor: default;
}

.btn-icon {
  width: 20px;
  height: 20px;
}

@media (max-width: 768px) {
  .job-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .meta-items {
    flex-wrap: wrap;
    gap: 16px;
  }
}
</style>

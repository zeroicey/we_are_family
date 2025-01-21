<template>
  <div class="job-card-skeleton">
    <div class="company-info">
      <SkeletonLoader width="48px" height="48px" radius="8px" />
      <div class="company-meta">
        <SkeletonLoader width="120px" height="18px" class="company-name" />
        <div class="company-tags">
          <SkeletonLoader width="80px" height="20px" />
          <SkeletonLoader width="60px" height="20px" />
        </div>
      </div>
    </div>
    
    <div class="job-info">
      <div class="job-header">
        <SkeletonLoader width="160px" height="24px" />
        <SkeletonLoader width="100px" height="20px" />
      </div>
      
      <div class="job-tags">
        <SkeletonLoader width="60px" height="24px" />
        <SkeletonLoader width="80px" height="24px" />
        <SkeletonLoader width="70px" height="24px" />
      </div>
      
      <div class="job-meta">
        <SkeletonLoader width="80px" height="16px" />
        <SkeletonLoader width="100px" height="16px" />
        <SkeletonLoader width="90px" height="16px" />
      </div>
      
      <div class="job-highlights">
        <SkeletonLoader width="100px" height="24px" />
        <SkeletonLoader width="120px" height="24px" />
        <SkeletonLoader width="90px" height="24px" />
      </div>
    </div>

    <div class="job-status">
      <SkeletonLoader width="60px" height="24px" />
      <SkeletonLoader width="80px" height="32px" radius="16px" />
    </div>
  </div>
</template>

<script setup>
import SkeletonLoader from '../common/SkeletonLoader.vue'
</script>

<style scoped>
.job-card-skeleton {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.company-info {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.company-meta {
  flex: 1;
}

.company-name {
  margin-bottom: 8px;
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

.job-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.job-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
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

.job-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

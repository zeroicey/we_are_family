<template>
  <div class="activity-card-skeleton">
    <div class="user-info">
      <SkeletonLoader class="avatar" width="40px" height="40px" radius="50%" />
      <SkeletonLoader width="80px" height="16px" />
    </div>
    <div class="content">
      <SkeletonLoader width="70%" height="20px" class="title" />
      <div class="description">
        <SkeletonLoader width="100%" height="16px" />
        <SkeletonLoader width="90%" height="16px" />
        <SkeletonLoader width="60%" height="16px" />
      </div>
      <div class="media">
        <SkeletonLoader width="100%" height="200px" radius="8px" />
      </div>
      <div class="meta">
        <div class="tags">
          <SkeletonLoader width="60px" height="24px" radius="4px" />
          <SkeletonLoader width="80px" height="24px" radius="4px" />
        </div>
        <div class="stats">
          <SkeletonLoader width="40px" height="16px" />
          <SkeletonLoader width="40px" height="16px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SkeletonLoader from '../common/SkeletonLoader.vue'
</script>

<style scoped>
.activity-card-skeleton {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.content {
  margin-left: 52px;
}

.title {
  margin-bottom: 16px;
}

.description {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.media {
  margin-bottom: 16px;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tags {
  display: flex;
  gap: 8px;
}

.stats {
  display: flex;
  gap: 16px;
}
</style>

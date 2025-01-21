<template>
  <div class="stats">
    <div class="stat-card">
      <div class="stat-value">{{ totalFocusHours }}</div>
      <div class="stat-label">总专注时长(小时)</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">{{ averageDailyMinutes }}</div>
      <div class="stat-label">日均专注(分钟)</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">{{ consecutiveDays }}</div>
      <div class="stat-label">连续打卡(天)</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  totalFocusHours: {
    type: Number,
    required: true
  },
  averageDailyMinutes: {
    type: Number,
    required: true
  },
  consecutiveDays: {
    type: Number,
    required: true
  }
})
</script>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 12px;
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #07C160;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #666;
}
</style>

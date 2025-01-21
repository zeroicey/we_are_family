<template>
  <div class="trend-chart">
    <h2>专注时长趋势</h2>
    <div class="chart">
      <div 
        v-for="(value, index) in data" 
        :key="index"
        class="chart-bar"
        :style="{ height: `${value}%` }"
      ></div>
    </div>
    <div class="chart-labels">
      <span v-for="(label, index) in labels" :key="index">
        {{ label }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    required: true
  },
  labels: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.trend-chart {
  background: white;
  border-radius: 12px;
  padding: 16px;
}

.trend-chart h2 {
  font-size: 16px;
  margin-bottom: 16px;
}

.chart {
  height: 150px;
  display: flex;
  align-items: flex-end;
  gap: 12px;
  padding: 0 8px;
  margin-bottom: 8px;
}

.chart-bar {
  flex: 1;
  background: #07C160;
  border-radius: 4px 4px 0 0;
  transition: height 0.3s;
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 12px;
}
</style>

<template>
  <div class="calendar">
    <div class="calendar-header">
      <button class="arrow-button" @click="$emit('previous')">
        <ChevronLeft />
      </button>
      <span class="current-month">{{ currentMonthText }}</span>
      <button class="arrow-button" @click="$emit('next')">
        <ChevronRight />
      </button>
    </div>
    
    <div class="weekdays">
      <span v-for="day in weekDays" :key="day">{{ day }}</span>
    </div>

    <div class="calendar-grid">
      <div 
        v-for="day in days" 
        :key="day.date"
        :class="['calendar-day', { 
          'other-month': !day.isCurrentMonth,
          'has-record': day.focusMinutes > 0
        }]"
        @click="$emit('select-day', day)"
      >
        <span class="day-number">{{ day.dayNumber }}</span>
        <span v-if="day.focusMinutes > 0" class="focus-minutes">
          {{ day.focusMinutes }}分钟
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

defineProps({
  currentMonthText: {
    type: String,
    required: true
  },
  weekDays: {
    type: Array,
    required: true
  },
  days: {
    type: Array,
    required: true
  }
})

defineEmits(['previous', 'next', 'select-day'])
</script>

<style scoped>
.calendar {
  background: white;
  border-radius: 12px;
  padding: 16px;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.current-month {
  font-size: 16px;
  font-weight: 500;
}

.arrow-button {
  padding: 8px;
  color: #666;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.calendar-day {
  aspect-ratio: 1;
  padding: 4px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.calendar-day:hover {
  background-color: #f5f5f5;
}

.calendar-day.other-month {
  opacity: 0.3;
}

.calendar-day.has-record {
  background-color: #e6f7ef;
}

.day-number {
  font-size: 14px;
  margin-bottom: 2px;
}

.focus-minutes {
  font-size: 10px;
  color: #07C160;
}
</style>

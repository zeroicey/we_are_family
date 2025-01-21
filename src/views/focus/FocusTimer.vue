<template>
  <div class="focus-timer">
    <AppHeader title="专注模式" :show-back="false">
      <template #right>
        <div class="header-actions">
          <button class="action-btn" @click="showGoalDialog = true">
            <Target />
            目标
          </button>
          <button class="record-button" @click="goToRecord">
            <History />
            记录
          </button>
        </div>
      </template>
    </AppHeader>

    <div class="timer-container">
      <div class="current-goal" v-if="currentGoal">
        <component :is="currentGoal.icon" class="goal-icon" />
        <span class="goal-text">{{ currentGoal.tag === 'rest' ? '休息时间' : currentGoal.note || '专注时间' }}</span>
      </div>

      <TimerCircle 
        :time-left="timeLeft"
        :total-time="selectedDuration * 60"
        :is-running="isRunning"
      />

      <TimerControls 
        :is-running="isRunning"
        :can-reset="canReset"
        @toggle="toggleTimer"
        @reset="resetTimer"
      />

      <DurationSelector
        v-model="selectedDuration"
        :durations="durations"
      />
    </div>

    <div class="environment-section">
      <h3 class="section-title">专注环境</h3>
      <FocusEnvironment />
    </div>

    <FocusGoalDialog
      v-model:visible="showGoalDialog"
      @confirm="handleGoalConfirm"
    />

    <!-- 完成提示 -->
    <ActionDialog
      :visible="showCompletionDialog"
      @update:visible="showCompletionDialog = $event"
      title="专注完成！"
      confirm-text="记录"
      cancel-text="关闭"
      @confirm="saveAndClose"
      @cancel="closeCompletionDialog"
    >
      <div class="completion-content">
        <Trophy class="completion-icon" />
        <p class="completion-text">
          太棒了！你已经专注了 {{ selectedDuration }} 分钟
        </p>
        <textarea
          v-model="completionNote"
          placeholder="记录一下这段时间的收获..."
          maxlength="200"
          rows="3"
        ></textarea>
      </div>
    </ActionDialog>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { History, Target, Trophy } from 'lucide-vue-next'
import AppHeader from '../../components/common/AppHeader.vue'
import TimerCircle from '../../components/focus/TimerCircle.vue'
import TimerControls from '../../components/focus/TimerControls.vue'
import DurationSelector from '../../components/focus/DurationSelector.vue'
import FocusEnvironment from '../../components/focus/FocusEnvironment.vue'
import FocusGoalDialog from '../../components/focus/FocusGoalDialog.vue'
import ActionDialog from '../../components/common/ActionDialog.vue'

const router = useRouter()
const durations = [25, 30, 45, 60]
const selectedDuration = ref(25)
const timeLeft = ref(selectedDuration.value * 60)
const isRunning = ref(false)
let timerInterval = null

// 目标相关
const showGoalDialog = ref(false)
const currentGoal = ref(null)

// 完成对话框相关
const showCompletionDialog = ref(false)
const completionNote = ref('')

const canReset = computed(() => {
  return timeLeft.value !== selectedDuration.value * 60 || isRunning.value
})

// 监听选中时长的变化
watch(selectedDuration, (newDuration) => {
  if (!isRunning.value) {
    timeLeft.value = newDuration * 60
  }
})

const toggleTimer = () => {
  if (isRunning.value) {
    pauseTimer()
  } else {
    startTimer()
  }
}

const startTimer = () => {
  if (timeLeft.value <= 0) return
  isRunning.value = true
  timerInterval = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      completeFocus()
    }
  }, 1000)
}

const pauseTimer = () => {
  isRunning.value = false
  clearInterval(timerInterval)
}

const resetTimer = () => {
  pauseTimer()
  timeLeft.value = selectedDuration.value * 60
}

const completeFocus = () => {
  pauseTimer()
  playCompletionSound()
  showCompletionDialog.value = true
}

const playCompletionSound = () => {
  const audio = new Audio('/sounds/complete.mp3')
  audio.play()
}

const handleGoalConfirm = (goal) => {
  currentGoal.value = goal
  showGoalDialog.value = false
  // 根据目标设置默认时长
  if (goal.tag === 'rest') {
    selectedDuration.value = 5
  } else {
    selectedDuration.value = Math.min(goal.dailyGoal, 60)
  }
  timeLeft.value = selectedDuration.value * 60
}

const saveAndClose = () => {
  // TODO: Save focus record with completion note
  showCompletionDialog.value = false
  completionNote.value = ''
  resetTimer()
}

const closeCompletionDialog = () => {
  showCompletionDialog.value = false
  completionNote.value = ''
  resetTimer()
}

const goToRecord = () => {
  router.push('/focus/record')
}
</script>

<style scoped>
.focus-timer {
  min-height: 100vh;
  background: #f5f5f5;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.action-btn,
.record-button {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 16px;
  background: white;
  color: #07C160;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover,
.record-button:hover {
  background: #f5f5f5;
}

.timer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 32px 20px;
}

.current-goal {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.goal-icon {
  width: 16px;
  height: 16px;
  color: #07C160;
}

.goal-text {
  font-size: 14px;
  color: #333;
}

.environment-section {
  padding: 0 20px 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 12px;
}

.completion-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 0 12px;
}

.completion-icon {
  width: 48px;
  height: 48px;
  color: #07C160;
}

.completion-text {
  font-size: 16px;
  color: #333;
  text-align: center;
}

textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  resize: none;
}
</style>

<template>
  <div class="community">
    <AppHeader title="互助社区" :show-back="false">
      <template #right>
        <button class="create-btn" @click="handleCreate">
          <Plus class="create-icon" />
          发起互助
        </button>
      </template>
    </AppHeader>
    
    <div class="content">
      <ActivityList />
    </div>

    <CreateHelpDialog
      :visible="showCreateDialog"
      @update:visible="showCreateDialog = $event"
      @success="handleCreateSuccess"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from 'lucide-vue-next'
import AppHeader from '../components/common/AppHeader.vue'
import ActivityList from '../components/community/ActivityList.vue'
import CreateHelpDialog from '../components/help/CreateHelpDialog.vue'

const showCreateDialog = ref(false)

const handleCreate = () => {
  showCreateDialog.value = true
}

const handleCreateSuccess = () => {
  showCreateDialog.value = false
  // TODO: 刷新活动列表
}
</script>

<style scoped>
.community {
  min-height: 100vh;
  background: #f5f5f5;
}

.content {
  padding: 16px;
}

.create-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 16px;
  background: #07C160;
  color: white;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.create-btn:hover {
  background: #06a152;
}

.create-icon {
  width: 16px;
  height: 16px;
}
</style>

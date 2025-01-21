<template>
  <div class="profile-card">
    <div class="header">
      <div class="user-info">
        <img :src="user.avatar" :alt="user.name" class="avatar">
        <div class="info">
          <h2 class="name">{{ user.name }}</h2>
          <p class="school">{{ user.school }}</p>
        </div>
      </div>
      <button class="edit-btn" @click="$emit('edit')">
        <Edit3 class="edit-icon" />
        编辑资料
      </button>
    </div>

    <div class="stats">
      <div 
        v-for="stat in stats" 
        :key="stat.label" 
        class="stat-item"
        @click="$router.push(stat.path)"
      >
        <span class="stat-value">{{ stat.value }}</span>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </div>

    <div class="tags">
      <div class="tag-group" v-if="user.major">
        <Briefcase class="tag-icon" />
        <span>{{ user.major }}</span>
      </div>
      <div class="tag-group" v-if="user.grade">
        <GraduationCap class="tag-icon" />
        <span>{{ user.grade }}</span>
      </div>
      <div class="tag-group" v-if="user.location">
        <MapPin class="tag-icon" />
        <span>{{ user.location }}</span>
      </div>
    </div>

    <div class="bio" v-if="user.bio">
      {{ user.bio }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Edit3, Briefcase, GraduationCap, MapPin } from 'lucide-vue-next'

const router = useRouter()

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const stats = computed(() => [
  {
    label: '互助时长',
    value: props.user.helpHours + 'h',
    path: '/focus/record'
  },
  {
    label: '投递数',
    value: props.user.applicationCount,
    path: '/jobs/applications'
  },
  {
    label: '收藏数',
    value: props.user.favoriteCount,
    path: '/jobs/favorites'
  }
])
</script>

<style scoped>
.profile-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.user-info {
  display: flex;
  gap: 16px;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.name {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.school {
  font-size: 14px;
  color: #666;
}

.edit-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  color: #666;
  background: #f5f5f5;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.edit-btn:hover {
  background: #e0e0e0;
}

.edit-icon {
  width: 16px;
  height: 16px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px 0;
  margin-bottom: 24px;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.stat-item:hover {
  opacity: 0.8;
}

.stat-value {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.stat-label {
  font-size: 12px;
  color: #999;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
}

.tag-group {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #666;
  font-size: 14px;
}

.tag-icon {
  width: 16px;
  height: 16px;
}

.bio {
  font-size: 14px;
  line-height: 1.6;
  color: #666;
}

@media (max-width: 768px) {
  .profile-card {
    padding: 16px;
  }

  .avatar {
    width: 48px;
    height: 48px;
  }

  .name {
    font-size: 18px;
  }

  .stats {
    gap: 12px;
  }

  .stat-value {
    font-size: 18px;
  }
}
</style>

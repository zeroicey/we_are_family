<template>
  <div class="resume-preview">
    <!-- 基本信息 -->
    <section class="section">
      <h2 class="section-title">基本信息</h2>
      <div class="basic-info">
        <img :src="resume.avatar" :alt="resume.name" class="avatar">
        <div class="info">
          <h3 class="name">{{ resume.name }}</h3>
          <div class="info-items">
            <div class="info-item">
              <GraduationCap class="info-icon" />
              <span>{{ resume.education }}</span>
            </div>
            <div class="info-item">
              <MapPin class="info-icon" />
              <span>{{ resume.location }}</span>
            </div>
            <div class="info-item">
              <Mail class="info-icon" />
              <span>{{ resume.email }}</span>
            </div>
            <div class="info-item">
              <Phone class="info-icon" />
              <span>{{ resume.phone }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 教育经历 -->
    <section class="section">
      <h2 class="section-title">教育经历</h2>
      <div class="education-list">
        <div v-for="edu in resume.education_list" :key="edu.school" class="education-item">
          <div class="edu-header">
            <h3 class="school">{{ edu.school }}</h3>
            <span class="time">{{ edu.time }}</span>
          </div>
          <p class="major">{{ edu.major }} | {{ edu.degree }}</p>
          <p class="gpa" v-if="edu.gpa">GPA: {{ edu.gpa }}</p>
        </div>
      </div>
    </section>

    <!-- 专业技能 -->
    <section class="section">
      <h2 class="section-title">专业技能</h2>
      <div class="skills">
        <div v-for="(skill, index) in resume.skills" :key="index" class="skill-item">
          {{ skill }}
        </div>
      </div>
    </section>

    <!-- 项目经历 -->
    <section class="section">
      <h2 class="section-title">项目经历</h2>
      <div class="project-list">
        <div v-for="project in resume.projects" :key="project.name" class="project-item">
          <div class="project-header">
            <h3 class="project-name">{{ project.name }}</h3>
            <span class="time">{{ project.time }}</span>
          </div>
          <p class="project-role">{{ project.role }}</p>
          <ul class="project-points">
            <li v-for="(point, index) in project.points" :key="index">
              {{ point }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 实习经历 -->
    <section class="section" v-if="resume.internships?.length">
      <h2 class="section-title">实习经历</h2>
      <div class="internship-list">
        <div v-for="intern in resume.internships" :key="intern.company" class="internship-item">
          <div class="intern-header">
            <h3 class="company">{{ intern.company }}</h3>
            <span class="time">{{ intern.time }}</span>
          </div>
          <p class="position">{{ intern.position }}</p>
          <ul class="intern-points">
            <li v-for="(point, index) in intern.points" :key="index">
              {{ point }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { GraduationCap, MapPin, Mail, Phone } from 'lucide-vue-next'

defineProps({
  resume: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.resume-preview {
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.section {
  margin-bottom: 32px;
}

.section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #07C160;
}

/* 基本信息 */
.basic-info {
  display: flex;
  gap: 24px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.info {
  flex: 1;
}

.name {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.info-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
}

.info-icon {
  width: 16px;
  height: 16px;
}

/* 教育经历 */
.education-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.education-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.edu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.school {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.time {
  font-size: 14px;
  color: #666;
}

.major {
  font-size: 14px;
  color: #666;
}

.gpa {
  font-size: 14px;
  color: #666;
}

/* 专业技能 */
.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.skill-item {
  padding: 6px 12px;
  background: #f5f5f5;
  border-radius: 16px;
  font-size: 14px;
  color: #666;
}

/* 项目经历 */
.project-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.project-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-name {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.project-role {
  font-size: 14px;
  color: #666;
}

.project-points {
  margin: 0;
  padding-left: 20px;
}

.project-points li {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 4px;
}

/* 实习经历 */
.internship-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.internship-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.intern-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.company {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.position {
  font-size: 14px;
  color: #666;
}

.intern-points {
  margin: 0;
  padding-left: 20px;
}

.intern-points li {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 4px;
}

@media (max-width: 768px) {
  .resume-preview {
    padding: 20px;
    border-radius: 0;
  }

  .basic-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .info-items {
    grid-template-columns: 1fr;
  }

  .edu-header,
  .project-header,
  .intern-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
</style>

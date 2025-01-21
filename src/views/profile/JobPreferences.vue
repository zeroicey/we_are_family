<template>
  <div class="job-preferences">
    <AppHeader title="求职意向" />
    
    <div class="content">
      <form @submit.prevent="savePreferences">
        <div class="form-section">
          <h3>期望工作</h3>
          <div class="form-group">
            <label>期望职位</label>
            <select v-model="preferences.jobType">
              <option value="frontend">前端开发工程师</option>
              <option value="backend">后端开发工程师</option>
              <option value="fullstack">全栈开发工程师</option>
              <option value="android">Android开发工程师</option>
              <option value="ios">iOS开发工程师</option>
              <option value="testing">测试工程师</option>
              <option value="product">产品经理</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>期望城市</label>
            <select v-model="preferences.city">
              <option value="guangzhou">广州</option>
              <option value="shenzhen">深圳</option>
              <option value="beijing">北京</option>
              <option value="shanghai">上海</option>
              <option value="hangzhou">杭州</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>期望薪资（月薪/K）</label>
            <div class="salary-range">
              <input type="number" v-model="preferences.salaryMin" placeholder="最低" />
              <span>-</span>
              <input type="number" v-model="preferences.salaryMax" placeholder="最高" />
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>求职状态</h3>
          <div class="form-group">
            <label>当前状态</label>
            <select v-model="preferences.status">
              <option value="active">在校招积极找工作</option>
              <option value="passive">在校招随便看看</option>
              <option value="not_looking">暂不找工作</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>到岗时间</label>
            <select v-model="preferences.availability">
              <option value="immediate">随时到岗</option>
              <option value="1month">1个月内</option>
              <option value="3months">3个月内</option>
              <option value="6months">6个月内</option>
              <option value="graduate">毕业后到岗</option>
            </select>
          </div>
        </div>

        <div class="form-section">
          <h3>工作偏好</h3>
          <div class="form-group">
            <label>工作性质</label>
            <div class="checkbox-group">
              <label>
                <input type="checkbox" v-model="preferences.jobNature" value="fulltime" />
                全职
              </label>
              <label>
                <input type="checkbox" v-model="preferences.jobNature" value="internship" />
                实习
              </label>
            </div>
          </div>
          
          <div class="form-group">
            <label>公司类型</label>
            <div class="checkbox-group">
              <label v-for="type in companyTypes" :key="type.value">
                <input 
                  type="checkbox" 
                  v-model="preferences.companyTypes" 
                  :value="type.value"
                />
                {{ type.label }}
              </label>
            </div>
          </div>
        </div>

        <button type="submit" class="save-btn">保存设置</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../../components/common/AppHeader.vue'
import { showToast } from '../../utils/toast'

const router = useRouter()

const companyTypes = [
  { label: '互联网', value: 'internet' },
  { label: '国企', value: 'state_owned' },
  { label: '外企', value: 'foreign' },
  { label: '创业公司', value: 'startup' },
  { label: '上市公司', value: 'listed' }
]

const preferences = ref({
  jobType: 'frontend',
  city: 'guangzhou',
  salaryMin: 10,
  salaryMax: 20,
  status: 'active',
  availability: 'graduate',
  jobNature: ['fulltime'],
  companyTypes: ['internet', 'foreign']
})

const savePreferences = async () => {
  // TODO: 调用API保存设置
  showToast('保存成功')
  router.back()
}
</script>

<style scoped>
.job-preferences {
  min-height: 100vh;
  background: #f5f5f5;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.form-section h3 {
  margin: 0 0 20px;
  font-size: 16px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #666;
}

select, input[type="number"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  color: #333;
  font-size: 14px;
}

.salary-range {
  display: flex;
  align-items: center;
  gap: 12px;
}

.salary-range input {
  flex: 1;
}

.salary-range span {
  color: #999;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  cursor: pointer;
}

.save-btn {
  display: block;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #07C160;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.save-btn:hover {
  opacity: 0.9;
}

@media (max-width: 768px) {
  .content {
    padding: 12px;
  }
  
  .form-section {
    padding: 16px;
    margin-bottom: 12px;
  }
}
</style>

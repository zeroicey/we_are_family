<template>
  <div class="help-page">
    <AppHeader title="帮助与反馈" />
    
    <div class="content">
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="搜索常见问题..."
          @input="handleSearch"
        />
      </div>

      <!-- 常见问题 -->
      <div class="section faq-section" v-if="!searchQuery">
        <h3>常见问题</h3>
        <div class="faq-list">
          <div 
            v-for="faq in faqs" 
            :key="faq.id"
            class="faq-item"
            :class="{ active: faq.id === activeFaq }"
            @click="toggleFaq(faq.id)"
          >
            <div class="faq-header">
              <span class="faq-title">{{ faq.question }}</span>
              <ChevronDown 
                class="faq-icon"
                :class="{ rotated: faq.id === activeFaq }"
              />
            </div>
            <div class="faq-content" v-show="faq.id === activeFaq">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>

      <!-- 搜索结果 -->
      <div class="section" v-else>
        <h3>搜索结果</h3>
        <div class="search-results" v-if="searchResults.length">
          <div 
            v-for="result in searchResults" 
            :key="result.id"
            class="search-result"
            @click="toggleFaq(result.id)"
          >
            {{ result.question }}
          </div>
        </div>
        <div class="empty-state" v-else>
          <p>未找到相关问题</p>
          <p>你可以直接联系客服获取帮助</p>
        </div>
      </div>

      <!-- 反馈 -->
      <div class="section feedback-section">
        <h3>问题反馈</h3>
        <div class="feedback-form">
          <div class="form-group">
            <label>问题类型</label>
            <select v-model="feedback.type">
              <option value="bug">功能异常</option>
              <option value="suggestion">功能建议</option>
              <option value="complaint">投诉</option>
              <option value="other">其他</option>
            </select>
          </div>

          <div class="form-group">
            <label>问题描述</label>
            <textarea 
              v-model="feedback.content"
              placeholder="请详细描述你遇到的问题..."
              rows="4"
            ></textarea>
          </div>

          <div class="form-group">
            <label>联系方式</label>
            <input 
              type="text"
              v-model="feedback.contact"
              placeholder="请留下你的手机号或邮箱"
            />
          </div>

          <div class="form-group">
            <label class="upload-label">
              <span>上传截图（选填）</span>
              <span class="upload-tip">最多3张，每张不超过5MB</span>
            </label>
            <div class="upload-area">
              <div 
                v-for="(image, index) in feedback.images" 
                :key="index"
                class="image-preview"
              >
                <img :src="image" alt="preview" />
                <button 
                  class="remove-btn"
                  @click.stop="removeImage(index)"
                >
                  <X class="remove-icon" />
                </button>
              </div>
              <label 
                class="upload-btn"
                v-if="feedback.images.length < 3"
              >
                <Plus class="upload-icon" />
                <input 
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                  hidden
                />
              </label>
            </div>
          </div>

          <button 
            class="submit-btn"
            :disabled="!isValidFeedback"
            @click="submitFeedback"
          >
            提交反馈
          </button>
        </div>
      </div>

      <!-- 联系我们 -->
      <div class="section contact-section">
        <h3>联系我们</h3>
        <div class="contact-info">
          <div class="contact-item">
            <Mail class="contact-icon" />
            <div class="contact-detail">
              <span class="contact-label">邮箱</span>
              <span class="contact-value">support@wearefamily.com</span>
            </div>
          </div>
          <div class="contact-item">
            <Phone class="contact-icon" />
            <div class="contact-detail">
              <span class="contact-label">电话</span>
              <span class="contact-value">400-888-8888</span>
            </div>
          </div>
          <div class="contact-item">
            <MessageCircle class="contact-icon" />
            <div class="contact-detail">
              <span class="contact-label">微信公众号</span>
              <span class="contact-value">互成一家</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  ChevronDown, Plus, X, 
  Mail, Phone, MessageCircle 
} from 'lucide-vue-next'
import AppHeader from '../../components/common/AppHeader.vue'
import { showToast } from '../../utils/toast'

const searchQuery = ref('')
const activeFaq = ref(null)
const feedback = ref({
  type: 'bug',
  content: '',
  contact: '',
  images: []
})

const faqs = [
  {
    id: 1,
    question: '如何修改个人资料？',
    answer: '点击个人主页右上角的编辑按钮，即可修改你的个人资料，包括头像、昵称、个人简介等信息。'
  },
  {
    id: 2,
    question: '如何开始结对学习？',
    answer: '你可以在首页点击"发起结对"按钮，选择学习目标和时间，系统会为你匹配合适的学习伙伴。'
  },
  {
    id: 3,
    question: '如何投递简历？',
    answer: '在职位详情页面点击"投递简历"按钮，选择要投递的简历版本，确认无误后即可投递。'
  },
  {
    id: 4,
    question: '忘记密码怎么办？',
    answer: '点击登录页面的"忘记密码"，通过绑定的手机号或邮箱进行验证，即可重置密码。'
  },
  {
    id: 5,
    question: '如何设置求职意向？',
    answer: '在个人主页点击"求职意向"，可以设置期望职位、工作城市、薪资范围等信息。'
  }
]

const searchResults = computed(() => {
  if (!searchQuery.value) return []
  const query = searchQuery.value.toLowerCase()
  return faqs.filter(faq => 
    faq.question.toLowerCase().includes(query) || 
    faq.answer.toLowerCase().includes(query)
  )
})

const isValidFeedback = computed(() => {
  return feedback.value.type && 
         feedback.value.content.length >= 10 &&
         feedback.value.contact
})

const handleSearch = () => {
  activeFaq.value = null
}

const toggleFaq = (id) => {
  activeFaq.value = activeFaq.value === id ? null : id
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  if (file.size > 5 * 1024 * 1024) {
    showToast('图片大小不能超过5MB')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    feedback.value.images.push(e.target.result)
  }
  reader.readAsDataURL(file)
}

const removeImage = (index) => {
  feedback.value.images.splice(index, 1)
}

const submitFeedback = async () => {
  // TODO: 调用API提交反馈
  showToast('反馈已提交，感谢你的建议')
  feedback.value = {
    type: 'bug',
    content: '',
    contact: '',
    images: []
  }
}
</script>

<style scoped>
.help-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.search-box {
  margin-bottom: 20px;
}

.search-box input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background: white;
}

.section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.section h3 {
  margin: 0 0 20px;
  font-size: 16px;
  color: #333;
}

/* FAQ样式 */
.faq-item {
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  margin-bottom: 12px;
  overflow: hidden;
}

.faq-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  cursor: pointer;
  background: #fafafa;
}

.faq-title {
  font-size: 14px;
  color: #333;
}

.faq-icon {
  width: 20px;
  height: 20px;
  color: #999;
  transition: transform 0.3s ease;
}

.faq-icon.rotated {
  transform: rotate(180deg);
}

.faq-content {
  padding: 16px;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  border-top: 1px solid #f0f0f0;
}

/* 搜索结果样式 */
.search-result {
  padding: 12px 16px;
  border-radius: 8px;
  background: #fafafa;
  margin-bottom: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
}

.search-result:hover {
  background: #f5f5f5;
}

.empty-state {
  text-align: center;
  padding: 32px 0;
  color: #999;
}

.empty-state p {
  margin: 8px 0;
}

/* 反馈表单样式 */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #666;
  font-size: 14px;
}

.upload-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.upload-tip {
  font-size: 12px;
  color: #999;
}

select,
input[type="text"],
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background: white;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.upload-area {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.image-preview {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.remove-icon {
  width: 14px;
  height: 14px;
}

.upload-btn {
  width: 80px;
  height: 80px;
  border: 1px dashed #ddd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.upload-btn:hover {
  border-color: #07C160;
}

.upload-icon {
  width: 24px;
  height: 24px;
  color: #999;
}

.submit-btn {
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

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.submit-btn:not(:disabled):hover {
  opacity: 0.9;
}

/* 联系方式样式 */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.contact-icon {
  width: 24px;
  height: 24px;
  color: #07C160;
}

.contact-detail {
  display: flex;
  flex-direction: column;
}

.contact-label {
  font-size: 12px;
  color: #999;
}

.contact-value {
  font-size: 14px;
  color: #333;
}

@media (max-width: 768px) {
  .content {
    padding: 12px;
  }
  
  .section {
    padding: 16px;
    margin-bottom: 12px;
  }
}
</style>

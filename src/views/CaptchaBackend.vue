<template>
  <div class="captcha-page">
    <!-- Snow Effect -->
    <div class="snow-container">
      <div v-for="i in 30" :key="i" class="snowflake" :style="getSnowflakeStyle(i)">❄</div>
    </div>

    <!-- Background Glow -->
    <div class="bg-glow glow-1"></div>
    <div class="bg-glow glow-2"></div>

    <!-- Main Container -->
    <div class="captcha-container">
      <div class="header">
        <div class="skill-icon purple">
          <Database :size="36" />
        </div>
        <h1>Backend Engineering</h1>
        <p class="subtitle">NODE.JS • PYTHON • CLOUD</p>
      </div>

      <div class="instruction">
        <p>🧮 Giải phương trình để xác minh bạn là con người!</p>
      </div>

      <!-- Math Challenge -->
      <div class="math-challenge">
        <div class="equation">
          <span class="number">{{ num1 }}</span>
          <span class="operator">{{ operator }}</span>
          <span class="number">{{ num2 }}</span>
          <span class="equals">=</span>
          <span class="question">?</span>
        </div>

        <input 
          v-model="userAnswer" 
          type="number" 
          class="answer-input"
          placeholder="Nhập câu trả lời..."
          @keyup.enter="checkAnswer"
          :disabled="showResult && isCorrect"
        />
      </div>

      <!-- Result -->
      <div v-if="showResult" class="result" :class="resultClass">
        <div class="result-icon">{{ resultIcon }}</div>
        <div class="result-text">{{ resultMessage }}</div>
      </div>

      <!-- Buttons -->
      <div class="button-group">
        <button @click="checkAnswer" class="btn btn-primary" :disabled="!userAnswer || (showResult && isCorrect)">
          {{ isCorrect ? '✅ Đã Xác Minh' : '🔍 Kiểm Tra' }}
        </button>
        <button @click="reset" class="btn btn-secondary">🔄 Thử Lại</button>
        <button @click="goBack" class="btn btn-back">← Quay Lại</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Database } from 'lucide-vue-next'

const router = useRouter()

const operators = ['+', '-', '×']
const num1 = ref(0)
const num2 = ref(0)
const operator = ref('+')
const correctAnswer = ref(0)
const userAnswer = ref('')
const showResult = ref(false)
const isCorrect = ref(false)

const generateQuestion = () => {
  num1.value = Math.floor(Math.random() * 20) + 1
  num2.value = Math.floor(Math.random() * 20) + 1
  operator.value = operators[Math.floor(Math.random() * operators.length)]
  
  switch(operator.value) {
    case '+':
      correctAnswer.value = num1.value + num2.value
      break
    case '-':
      if (num1.value < num2.value) [num1.value, num2.value] = [num2.value, num1.value]
      correctAnswer.value = num1.value - num2.value
      break
    case '×':
      num1.value = Math.floor(Math.random() * 12) + 1
      num2.value = Math.floor(Math.random() * 12) + 1
      correctAnswer.value = num1.value * num2.value
      break
  }
}

generateQuestion()

const resultMessage = computed(() => {
  return isCorrect.value ? 'Chính Xác! Bạn thật thông minh!' : 'Sai rồi! Thử lại nhé!'
})

const resultIcon = computed(() => isCorrect.value ? '🎉' : '❌')
const resultClass = computed(() => isCorrect.value ? 'success' : 'error')

const checkAnswer = () => {
  isCorrect.value = parseInt(userAnswer.value) === correctAnswer.value
  showResult.value = true

  if (isCorrect.value) {
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }
}

const reset = () => {
  userAnswer.value = ''
  showResult.value = false
  isCorrect.value = false
  generateQuestion()
}

const goBack = () => {
  router.push('/')
}

const getSnowflakeStyle = (i) => {
  return {
    left: `${Math.random() * 100}%`,
    animationDuration: `${3 + Math.random() * 5}s`,
    animationDelay: `${Math.random() * 3}s`,
    fontSize: `${12 + Math.random() * 16}px`,
    opacity: 0.4 + Math.random() * 0.6
  }
}
</script>

<style scoped>
.captcha-page {
  min-height: 100vh;
  background: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
  overflow: hidden;
}

.snow-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.snowflake {
  position: absolute;
  color: white;
  user-select: none;
  animation: snowfall linear infinite;
}

@keyframes snowfall {
  0% { transform: translateY(-10px) rotate(0deg); }
  100% { transform: translateY(100vh) rotate(360deg); }
}

.bg-glow {
  position: fixed;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.15;
  animation: pulse 8s ease-in-out infinite;
}

.glow-1 {
  background: radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, transparent 70%);
  top: 20%;
  left: 20%;
}

.glow-2 {
  background: radial-gradient(circle, rgba(251, 191, 36, 0.6) 0%, transparent 70%);
  bottom: 20%;
  right: 20%;
  animation-delay: -4s;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.15; }
  50% { transform: scale(1.3); opacity: 0.25; }
}

.captcha-container {
  position: relative;
  z-index: 10;
  max-width: 500px;
  width: 100%;
  background: linear-gradient(to bottom right, rgba(31, 41, 55, 0.9), rgba(17, 24, 39, 0.9));
  backdrop-filter: blur(24px);
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.skill-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(to bottom right, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.2));
  border: 2px solid rgba(251, 191, 36, 0.4);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: #fbbf24;
}

.skill-icon.purple {
  background: linear-gradient(to bottom right, rgba(168, 85, 247, 0.2), rgba(147, 51, 234, 0.2));
  border-color: rgba(168, 85, 247, 0.4);
  color: #a855f7;
}

h1 {
  font-size: 1.5rem;
  color: #fbbf24;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.subtitle {
  font-size: 0.875rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.instruction {
  background: rgba(168, 85, 247, 0.1);
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #d1d5db;
}

.math-challenge {
  margin-bottom: 2rem;
}

.equation {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 2rem;
  background: rgba(168, 85, 247, 0.1);
  border-radius: 1rem;
  border: 2px dashed rgba(168, 85, 247, 0.3);
}

.number, .operator, .equals, .question {
  font-size: 3rem;
  font-weight: bold;
  color: #a855f7;
  text-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
}

.question {
  animation: pulse-question 1.5s ease-in-out infinite;
}

@keyframes pulse-question {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.answer-input {
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.5rem;
  text-align: center;
  background: rgba(17, 24, 39, 0.8);
  border: 2px solid rgba(168, 85, 247, 0.4);
  border-radius: 0.75rem;
  color: #fbbf24;
  font-weight: bold;
  transition: all 0.3s ease;
}

.answer-input:focus {
  outline: none;
  border-color: #a855f7;
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
}

.answer-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.answer-input::placeholder {
  color: #6b7280;
}

.result {
  padding: 1rem;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  text-align: center;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.result.success {
  background: rgba(34, 197, 94, 0.2);
  border: 1px solid rgba(34, 197, 94, 0.4);
}

.result.error {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.4);
}

.result-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.result-text {
  color: #d1d5db;
  font-size: 1rem;
  font-weight: 500;
}

.button-group {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn {
  flex: 1;
  min-width: 120px;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.btn-primary {
  background: linear-gradient(to right, #a855f7, #9333ea);
  color: white;
  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(168, 85, 247, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: rgba(55, 65, 81, 0.8);
  color: #d1d5db;
  border: 1px solid rgba(75, 85, 99, 0.5);
}

.btn-secondary:hover {
  background: rgba(75, 85, 99, 0.8);
  transform: scale(1.05);
}

.btn-back {
  background: rgba(251, 191, 36, 0.2);
  color: #fbbf24;
  border: 1px solid rgba(251, 191, 36, 0.4);
}

.btn-back:hover {
  background: rgba(251, 191, 36, 0.3);
  transform: scale(1.05);
}
</style>
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
        <div class="skill-icon blue">
          <Database :size="36" />
        </div>
        <h1>Advanced Database</h1>
        <p class="subtitle">MONGODB • POSTGRESQL • REDIS</p>
      </div>

      <div class="instruction">
        <p>🎯 Click vào tất cả biểu tượng <strong>{{ targetEmoji }}</strong></p>
        <p class="hint">Tìm {{ targetCount }} biểu tượng!</p>
      </div>

      <!-- Pattern Grid -->
      <div class="pattern-grid">
        <button
          v-for="(emoji, index) in emojiGrid"
          :key="index"
          class="emoji-card"
          :class="{ 
            'selected': selectedIndexes.includes(index),
            'correct': showResult && correctIndexes.includes(index),
            'wrong': showResult && selectedIndexes.includes(index) && !correctIndexes.includes(index)
          }"
          @click="selectEmoji(index)"
          :disabled="showResult && isCorrect"
        >
          {{ emoji }}
        </button>
      </div>

      <!-- Progress -->
      <div class="progress-info">
        <span>Đã chọn: {{ selectedIndexes.length }}/{{ targetCount }}</span>
      </div>

      <!-- Result -->
      <div v-if="showResult" class="result" :class="resultClass">
        <div class="result-icon">{{ resultIcon }}</div>
        <div class="result-text">{{ resultMessage }}</div>
      </div>

      <!-- Buttons -->
      <div class="button-group">
        <button @click="checkAnswer" class="btn btn-primary" :disabled="selectedIndexes.length !== targetCount || (showResult && isCorrect)">
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

const emojis = ['💾', '🗄️', '📊', '🔐', '⚡', '🎯', '💻', '🔧']
const emojiGrid = ref([])
const targetEmoji = ref('')
const targetCount = ref(0)
const correctIndexes = ref([])
const selectedIndexes = ref([])
const showResult = ref(false)
const isCorrect = ref(false)

const generateGrid = () => {
  // Random target emoji
  targetEmoji.value = emojis[Math.floor(Math.random() * emojis.length)]
  targetCount.value = 3 + Math.floor(Math.random() * 3) // 3-5 targets
  
  // Create grid with targets
  const grid = []
  correctIndexes.value = []
  
  // Add target emojis
  for (let i = 0; i < targetCount.value; i++) {
    grid.push(targetEmoji.value)
    correctIndexes.value.push(i)
  }
  
  // Fill remaining with other emojis
  while (grid.length < 16) {
    const randomEmoji = emojis.filter(e => e !== targetEmoji.value)[Math.floor(Math.random() * (emojis.length - 1))]
    grid.push(randomEmoji)
  }
  
  // Shuffle grid
  for (let i = grid.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [grid[i], grid[j]] = [grid[j], grid[i]]
    
    // Update correct indexes after shuffle
    if (correctIndexes.value.includes(i)) {
      correctIndexes.value[correctIndexes.value.indexOf(i)] = j
    } else if (correctIndexes.value.includes(j)) {
      correctIndexes.value[correctIndexes.value.indexOf(j)] = i
    }
  }
  
  emojiGrid.value = grid
}

generateGrid()

const selectEmoji = (index) => {
  if (selectedIndexes.value.includes(index)) {
    selectedIndexes.value = selectedIndexes.value.filter(i => i !== index)
  } else {
    selectedIndexes.value.push(index)
  }
}

const resultMessage = computed(() => {
  return isCorrect.value ? 'Hoàn Hảo! Bạn có mắt tinh tường!' : 'Chưa chính xác! Thử lại nhé!'
})

const resultIcon = computed(() => isCorrect.value ? '🎉' : '❌')
const resultClass = computed(() => isCorrect.value ? 'success' : 'error')

const checkAnswer = () => {
  const sortedSelected = [...selectedIndexes.value].sort((a, b) => a - b)
  const sortedCorrect = [...correctIndexes.value].sort((a, b) => a - b)
  
  isCorrect.value = JSON.stringify(sortedSelected) === JSON.stringify(sortedCorrect)
  showResult.value = true

  if (isCorrect.value) {
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }
}

const reset = () => {
  selectedIndexes.value = []
  showResult.value = false
  isCorrect.value = false
  generateGrid()
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
  background: radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%);
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
  max-width: 550px;
  width: 100%;
  background: linear-gradient(to bottom right, rgba(31, 41, 55, 0.9), rgba(17, 24, 39, 0.9));
  backdrop-filter: blur(24px);
  border: 1px solid rgba(59, 130, 246, 0.3);
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

.skill-icon.blue {
  background: linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.2));
  border-color: rgba(59, 130, 246, 0.4);
  color: #3b82f6;
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
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #d1d5db;
}

.instruction strong {
  color: #3b82f6;
  font-size: 1.5rem;
}

.hint {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #9ca3af;
}

.pattern-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.emoji-card {
  aspect-ratio: 1;
  background: rgba(17, 24, 39, 0.6);
  border: 2px solid rgba(55, 65, 81, 0.5);
  border-radius: 0.75rem;
  font-size: 2.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.emoji-card:hover:not(:disabled) {
  transform: scale(1.1);
  border-color: rgba(59, 130, 246, 0.6);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.emoji-card.selected {
  background: rgba(59, 130, 246, 0.3);
  border-color: #3b82f6;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}

.emoji-card.correct {
  background: rgba(34, 197, 94, 0.3);
  border-color: #22c55e;
  animation: correctPulse 0.5s ease;
}

.emoji-card.wrong {
  background: rgba(239, 68, 68, 0.3);
  border-color: #ef4444;
  animation: shake 0.5s ease;
}

@keyframes correctPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

.emoji-card:disabled {
  cursor: not-allowed;
}

.progress-info {
  text-align: center;
  color: #9ca3af;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  font-weight: 500;
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
  background: linear-gradient(to right, #3b82f6, #2563eb);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
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
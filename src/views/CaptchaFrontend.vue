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
        <div class="skill-icon">
          <Code :size="36" />
        </div>
        <h1>Frontend Architecture</h1>
        <p class="subtitle">REACT • NEXT.JS • TAILWIND</p>
      </div>

      <div class="instruction">
        <p>🎯 Kéo thanh slider đến vị trí <strong>{{ targetPosition }}%</strong></p>
      </div>

      <!-- Slider Puzzle -->
      <div class="slider-container">
        <div class="slider-track">
          <div class="slider-target" :style="{ left: targetPosition + '%' }">
            <div class="target-marker">🎯</div>
          </div>
          <div 
            class="slider-thumb" 
            :style="{ left: sliderValue + '%' }"
            @mousedown="startDrag"
            @touchstart="startDrag"
          >
            <div class="thumb-icon">🎨</div>
          </div>
        </div>
        <div class="slider-progress" :style="{ width: sliderValue + '%' }"></div>
      </div>

      <div class="slider-value">
        <span>Vị trí hiện tại: </span>
        <strong :class="{ 'text-success': isCorrect }">{{ Math.round(sliderValue) }}%</strong>
      </div>

      <!-- Result -->
      <div v-if="showResult" class="result" :class="resultClass">
        <div class="result-icon">{{ resultIcon }}</div>
        <div class="result-text">{{ resultMessage }}</div>
      </div>

      <!-- Buttons -->
      <div class="button-group">
        <button @click="checkAnswer" class="btn btn-primary" :disabled="showResult && isCorrect">
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
import { Code } from 'lucide-vue-next'

const router = useRouter()

const sliderValue = ref(50)
const targetPosition = ref(Math.floor(Math.random() * 60) + 20) // 20-80%
const showResult = ref(false)
const isCorrect = ref(false)
const isDragging = ref(false)

const resultMessage = computed(() => {
  return isCorrect.value ? 'Hoàn Hảo! Bạn đã vượt qua CAPTCHA!' : 'Chưa chính xác! Thử lại nhé!'
})

const resultIcon = computed(() => isCorrect.value ? '🎉' : '❌')
const resultClass = computed(() => isCorrect.value ? 'success' : 'error')

const checkAnswer = () => {
  const diff = Math.abs(sliderValue.value - targetPosition.value)
  isCorrect.value = diff <= 3 // tolerance ±3%
  showResult.value = true

  if (isCorrect.value) {
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }
}

const reset = () => {
  sliderValue.value = 50
  targetPosition.value = Math.floor(Math.random() * 60) + 20
  showResult.value = false
  isCorrect.value = false
}

const goBack = () => {
  router.push('/')
}

const startDrag = (e) => {
  isDragging.value = true
  const moveHandler = (moveEvent) => {
    if (!isDragging.value) return
    
    const container = moveEvent.target.closest('.slider-container')
    if (!container) return
    
    const rect = container.getBoundingClientRect()
    const clientX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX
    let newValue = ((clientX - rect.left) / rect.width) * 100
    
    newValue = Math.max(0, Math.min(100, newValue))
    sliderValue.value = newValue
  }

  const stopDrag = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', moveHandler)
    document.removeEventListener('mouseup', stopDrag)
    document.removeEventListener('touchmove', moveHandler)
    document.removeEventListener('touchend', stopDrag)
  }

  document.addEventListener('mousemove', moveHandler)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', moveHandler)
  document.addEventListener('touchend', stopDrag)
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
  background: radial-gradient(circle, rgba(251, 191, 36, 0.6) 0%, transparent 70%);
  top: 20%;
  left: 20%;
}

.glow-2 {
  background: radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, transparent 70%);
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
  border: 1px solid rgba(251, 191, 36, 0.3);
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
  background: rgba(251, 191, 36, 0.1);
  border: 1px solid rgba(251, 191, 36, 0.3);
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #d1d5db;
}

.instruction strong {
  color: #fbbf24;
  font-size: 1.125rem;
}

.slider-container {
  position: relative;
  height: 60px;
  background: rgba(17, 24, 39, 0.6);
  border-radius: 2rem;
  margin-bottom: 1rem;
  overflow: hidden;
  border: 2px solid rgba(55, 65, 81, 0.5);
}

.slider-track {
  position: absolute;
  inset: 0;
}

.slider-progress {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(to right, rgba(251, 191, 36, 0.3), rgba(251, 191, 36, 0.5));
  transition: width 0.1s;
  border-radius: 2rem;
}

.slider-target {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.target-marker {
  font-size: 2rem;
  filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.6));
  animation: bounce 1s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.slider-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border-radius: 50%;
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.5);
  z-index: 3;
  transition: transform 0.2s;
}

.slider-thumb:hover {
  transform: translate(-50%, -50%) scale(1.1);
}

.slider-thumb:active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(0.95);
}

.thumb-icon {
  font-size: 1.5rem;
}

.slider-value {
  text-align: center;
  color: #9ca3af;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.slider-value strong {
  color: #fbbf24;
  font-size: 1.25rem;
}

.text-success {
  color: #22c55e !important;
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
  background: linear-gradient(to right, #fbbf24, #f59e0b);
  color: black;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(251, 191, 36, 0.4);
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
  background: rgba(168, 85, 247, 0.2);
  color: #a855f7;
  border: 1px solid rgba(168, 85, 247, 0.4);
}

.btn-back:hover {
  background: rgba(168, 85, 247, 0.3);
  transform: scale(1.05);
}
</style>
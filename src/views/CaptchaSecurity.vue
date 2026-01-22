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
        <div class="skill-icon green">
          <Shield :size="36" />
        </div>
        <h1>UI/UX Designer</h1>
        <p class="subtitle">OAUTH • JWT • ENCRYPTION</p>
      </div>

      <div class="instruction">
        <p>🎡 Quay bánh xe và dừng ở vùng <strong class="golden">VÀNG</strong>!</p>
      </div>

      <!-- Spinning Wheel -->
      <div class="wheel-container">
        <div class="wheel-wrapper">
          <div class="wheel" :style="{ transform: `rotate(${rotation}deg)` }">
            <div v-for="(segment, index) in segments" :key="index" 
                 class="segment" 
                 :class="segment.color"
                 :style="{ transform: `rotate(${index * 45}deg)` }">
              <div class="segment-content">
                {{ segment.emoji }}
              </div>
            </div>
          </div>
          <div class="wheel-pointer">▼</div>
          <div class="wheel-center" @click="spin" :class="{ spinning: isSpinning }">
            {{ isSpinning ? '⏳' : '🎯' }}
          </div>
        </div>
      </div>

      <div class="spin-info">
        <p v-if="!hasSpun">Click vào giữa bánh xe để quay!</p>
        <p v-else-if="isSpinning">Đang quay...</p>
        <p v-else class="result-zone" :class="landedSegment.color">
          Dừng ở: <strong>{{ landedSegment.label }}</strong>
        </p>
      </div>

      <!-- Result -->
      <div v-if="showResult" class="result" :class="resultClass">
        <div class="result-icon">{{ resultIcon }}</div>
        <div class="result-text">{{ resultMessage }}</div>
      </div>

      <!-- Buttons -->
      <div class="button-group">
        <button @click="spin" class="btn btn-primary" :disabled="isSpinning || (showResult && isCorrect)">
          {{ isCorrect ? '✅ Đã Xác Minh' : isSpinning ? '⏳ Đang Quay...' : '🎡 Quay Bánh Xe' }}
        </button>
        <button @click="reset" class="btn btn-secondary" :disabled="isSpinning">🔄 Thử Lại</button>
        <button @click="goBack" class="btn btn-back">← Quay Lại</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Shield } from 'lucide-vue-next'

const router = useRouter()

const segments = [
  { color: 'golden', label: 'VÀNG', emoji: '⭐' },
  { color: 'red', label: 'ĐỎ', emoji: '🔴' },
  { color: 'golden', label: 'VÀNG', emoji: '⭐' },
  { color: 'blue', label: 'XANH', emoji: '🔵' },
  { color: 'golden', label: 'VÀNG', emoji: '⭐' },
  { color: 'red', label: 'ĐỎ', emoji: '🔴' },
  { color: 'golden', label: 'VÀNG', emoji: '⭐' },
  { color: 'blue', label: 'XANH', emoji: '🔵' }
]

const rotation = ref(0)
const isSpinning = ref(false)
const hasSpun = ref(false)
const landedSegment = ref({ color: '', label: '', emoji: '' })
const showResult = ref(false)
const isCorrect = ref(false)

const spin = () => {
  if (isSpinning.value) return
  
  isSpinning.value = true
  hasSpun.value = true
  showResult.value = false
  
  // Random rotation (5-8 full spins + random angle)
  const spins = 5 + Math.random() * 3
  const randomAngle = Math.random() * 360
  const totalRotation = spins * 360 + randomAngle
  
  rotation.value += totalRotation
  
  setTimeout(() => {
    isSpinning.value = false
    
    // Calculate which segment we landed on
    const normalizedRotation = rotation.value % 360
    const segmentAngle = 360 / segments.length
    const segmentIndex = Math.floor(normalizedRotation / segmentAngle)
    
    landedSegment.value = segments[segmentIndex]
    
    // Check if correct (landed on golden)
    isCorrect.value = landedSegment.value.color === 'golden'
    showResult.value = true
    
    if (isCorrect.value) {
      setTimeout(() => {
        router.push('/')
      }, 2500)
    }
  }, 4000)
}

const resultMessage = computed(() => {
  return isCorrect.value ? 'May Mắn Quá! Bạn đã trúng vùng vàng!' : 'Chưa trúng! Thử lại nhé!'
})

const resultIcon = computed(() => isCorrect.value ? '🎉' : '😅')
const resultClass = computed(() => isCorrect.value ? 'success' : 'error')

const reset = () => {
  rotation.value = 0
  hasSpun.value = false
  showResult.value = false
  isCorrect.value = false
  landedSegment.value = { color: '', label: '', emoji: '' }
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
  background: radial-gradient(circle, rgba(34, 197, 94, 0.6) 0%, transparent 70%);
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
  border: 1px solid rgba(34, 197, 94, 0.3);
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

.skill-icon.green {
  background: linear-gradient(to bottom right, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.2));
  border-color: rgba(34, 197, 94, 0.4);
  color: #22c55e;
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
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #d1d5db;
}

.instruction .golden {
  color: #fbbf24;
  font-size: 1.25rem;
  text-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
}

.wheel-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.wheel-wrapper {
  position: relative;
  width: 300px;
  height: 300px;
}

.wheel {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  transition: transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99);
  box-shadow: 0 0 40px rgba(251, 191, 36, 0.3);
}

.segment {
  position: absolute;
  width: 50%;
  height: 50%;
  top: 50%;
  left: 50%;
  transform-origin: 0 0;
  clip-path: polygon(0 0, 100% 0, 0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.segment.golden {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
}

.segment.red {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.segment.blue {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.segment-content {
  position: absolute;
  top: 30%;
  left: 30%;
  font-size: 2rem;
  transform: rotate(-22.5deg);
}

.wheel-pointer {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  color: #fbbf24;
  text-shadow: 0 0 10px rgba(251, 191, 36, 0.8);
  z-index: 10;
  animation: bounce 1s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(5px); }
}

.wheel-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(251, 191, 36, 0.5);
  z-index: 10;
  transition: all 0.3s ease;
  border: 4px solid rgba(17, 24, 39, 0.8);
}

.wheel-center:hover:not(.spinning) {
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow: 0 6px 30px rgba(251, 191, 36, 0.7);
}

.wheel-center.spinning {
  cursor: not-allowed;
  animation: pulse-center 0.5s ease-in-out infinite;
}

@keyframes pulse-center {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.05); }
}

.spin-info {
  text-align: center;
  margin-bottom: 1.5rem;
  min-height: 2rem;
}

.spin-info p {
  color: #9ca3af;
  font-size: 1rem;
}

.result-zone {
  font-size: 1.25rem;
  font-weight: bold;
}

.result-zone.golden {
  color: #fbbf24;
}

.result-zone.red {
  color: #ef4444;
}

.result-zone.blue {
  color: #3b82f6;
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
  background: linear-gradient(to right, #22c55e, #16a34a);
  color: white;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(34, 197, 94, 0.4);
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

.btn-secondary:hover:not(:disabled) {
  background: rgba(75, 85, 99, 0.8);
  transform: scale(1.05);
}

.btn-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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
<template>
  <div class="landing-container">
    <!-- Snow Effect - Premium Version -->
    <div class="snowflakes" aria-hidden="true">
      <div v-for="i in 60" :key="i" class="snowflake">
        <div class="snowflake-inner"></div>
      </div>
    </div>

    <!-- Premium Animated Background -->
    <div class="bg-animated">
      <div class="bg-gradient-animated"></div>
      <div class="bg-mesh">
        <div class="mesh-gradient mesh-1"></div>
        <div class="mesh-gradient mesh-2"></div>
        <div class="mesh-gradient mesh-3"></div>
        <div class="mesh-gradient mesh-4"></div>
      </div>
      <div class="bg-particles">
        <div v-for="i in 30" :key="i" class="particle"></div>
      </div>
      <div class="bg-glow glow-1"></div>
      <div class="bg-glow glow-2"></div>
      <div class="bg-glow glow-3"></div>
    </div>
    
    <!-- Main Card -->
    <div class="main-card-wrapper">
      <div class="main-card">
        
        <!-- Header -->
        <div class="header">
          <div class="title-section">
            <h1 class="main-title">
              ĐỖ GIA<br/>PHONG
            </h1>
            <div class="year">2004</div>
          </div>
          
          <div class="divider"></div>
          
          <div class="subtitle-section">
            <div class="dgp-text">DGP 2004</div>
            <div class="tagline">Masterpiece of Gaming Services</div>
          </div>
        </div>

        <!-- Zalo Contact -->
        <div class="zalo-section">
          <button class="zalo-button">
            <div class="zalo-content">
              <div class="zalo-icon">Z</div>
              <div class="zalo-info">
                <div class="zalo-label">Zalo Admin:</div>
                <div class="zalo-number">0369620631</div>
              </div>
            </div>
          </button>
        </div>

        <!-- Menu Items -->
        <div class="menu-section">
          <button 
            v-for="(item, index) in menuItems" 
            :key="index"
            class="menu-item"
            :class="`menu-item-${index}`"
          >
            <div class="menu-content">
              <div class="menu-icon" :class="`icon-bg-${index}`">
                <component :is="item.icon" :size="24" />
              </div>
              <div class="menu-text">
                <div class="menu-title">{{ item.title }}</div>
                <div class="menu-subtitle">{{ item.subtitle }}</div>
              </div>
              <div class="menu-arrow">
                <ChevronRight :size="20" />
              </div>
            </div>
          </button>
        </div>

        <!-- Premium Experience -->
        <div class="premium-section">
          <div class="premium-header">
            <span class="premium-icon">✨</span>
            <span class="premium-title">PREMIUM EXPERIENCE</span>
          </div>
          
          <div class="premium-text">
            Sử dụng <span class="highlight">Safari</span> hoặc
            <span class="highlight">Chrome</span> bản mới nhất để
            tận hưởng giao diện hiệu ứng 24K tốt nhất.
          </div>

          <div class="copy-section">
            <div class="link-display">{{ linkUrl }}</div>
            <button 
              @click="handleCopyLink" 
              class="copy-button"
              :class="{ copied: isCopied }"
            >
              <component :is="isCopied ? Check : Copy" :size="16" />
              <span>{{ isCopied ? 'COPIED' : 'COPY LINK' }}</span>
            </button>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <div class="footer-text">
            © 2024 <span class="footer-brand">ĐỖ GIA PHONG</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Text -->
    <div class="bottom-text">
      Refining the standards of excellence
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ShoppingBag, Download, Key, Users, ChevronRight, Copy, Check } from 'lucide-vue-next'

const isCopied = ref(false)
const linkUrl = 'dgp2004.site/official'

const menuItems = [
  {
    icon: ShoppingBag,
    title: 'Shop Mod Tự Động',
    subtitle: 'HỆ THỐNG TỐT NHẤT • 24/7'
  },
  {
    icon: Download,
    title: 'Link Tải All Game',
    subtitle: 'DATA CẬP NHẬT HẰNG GIỜ'
  },
  {
    icon: Key,
    title: 'Lấy Key Kích Hoạt',
    subtitle: 'TỰ ĐỘNG & BẢO MẬT TUYỆT ĐỐI'
  },
  {
    icon: Users,
    title: 'Nhóm Thông Báo',
    subtitle: 'SẢN DEAL & UPDATE MỚI NHẤT'
  }
]

const handleCopyLink = () => {
  navigator.clipboard.writeText(linkUrl)
  isCopied.value = true
  setTimeout(() => {
    isCopied.value = false
  }, 2000)
}
</script>

<style scoped>
/* Snow Effect - Premium Version */
.snowflakes {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.snowflake {
  position: absolute;
  top: -20px;
  animation: snowfall linear infinite;
}

.snowflake-inner {
  width: 10px;
  height: 10px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%);
  border-radius: 50%;
  box-shadow: 
    0 0 10px rgba(255, 255, 255, 0.5),
    0 0 20px rgba(255, 255, 255, 0.3),
    0 0 30px rgba(255, 255, 255, 0.1);
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes snowfall {
  0% {
    transform: translateY(-20px) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) translateX(100px) rotate(360deg);
    opacity: 0;
  }
}

@keyframes shimmer {
  0%, 100% {
    filter: brightness(1);
    transform: scale(1);
  }
  50% {
    filter: brightness(1.5);
    transform: scale(1.2);
  }
}

/* Unique snowflakes with varied properties */
.snowflake:nth-child(1) { left: 5%; animation-duration: 8s; animation-delay: 0s; }
.snowflake:nth-child(1) .snowflake-inner { width: 8px; height: 8px; }

.snowflake:nth-child(2) { left: 15%; animation-duration: 12s; animation-delay: 1s; }
.snowflake:nth-child(2) .snowflake-inner { width: 12px; height: 12px; }

.snowflake:nth-child(3) { left: 25%; animation-duration: 10s; animation-delay: 2s; }
.snowflake:nth-child(3) .snowflake-inner { width: 6px; height: 6px; }

.snowflake:nth-child(4) { left: 35%; animation-duration: 14s; animation-delay: 0.5s; }
.snowflake:nth-child(4) .snowflake-inner { width: 10px; height: 10px; }

.snowflake:nth-child(5) { left: 45%; animation-duration: 9s; animation-delay: 3s; }
.snowflake:nth-child(5) .snowflake-inner { width: 14px; height: 14px; }

.snowflake:nth-child(6) { left: 55%; animation-duration: 11s; animation-delay: 1.5s; }
.snowflake:nth-child(6) .snowflake-inner { width: 7px; height: 7px; }

.snowflake:nth-child(7) { left: 65%; animation-duration: 13s; animation-delay: 2.5s; }
.snowflake:nth-child(7) .snowflake-inner { width: 11px; height: 11px; }

.snowflake:nth-child(8) { left: 75%; animation-duration: 8.5s; animation-delay: 0.8s; }
.snowflake:nth-child(8) .snowflake-inner { width: 9px; height: 9px; }

.snowflake:nth-child(9) { left: 85%; animation-duration: 10.5s; animation-delay: 3.5s; }
.snowflake:nth-child(9) .snowflake-inner { width: 13px; height: 13px; }

.snowflake:nth-child(10) { left: 95%; animation-duration: 12.5s; animation-delay: 1.2s; }
.snowflake:nth-child(10) .snowflake-inner { width: 8px; height: 8px; }

.snowflake:nth-child(11) { left: 3%; animation-duration: 9.5s; animation-delay: 2.8s; }
.snowflake:nth-child(11) .snowflake-inner { width: 10px; height: 10px; }

.snowflake:nth-child(12) { left: 13%; animation-duration: 11.5s; animation-delay: 0.3s; }
.snowflake:nth-child(12) .snowflake-inner { width: 12px; height: 12px; }

.snowflake:nth-child(13) { left: 23%; animation-duration: 13.5s; animation-delay: 3.3s; }
.snowflake:nth-child(13) .snowflake-inner { width: 6px; height: 6px; }

.snowflake:nth-child(14) { left: 33%; animation-duration: 8.8s; animation-delay: 1.8s; }
.snowflake:nth-child(14) .snowflake-inner { width: 11px; height: 11px; }

.snowflake:nth-child(15) { left: 43%; animation-duration: 10.8s; animation-delay: 2.3s; }
.snowflake:nth-child(15) .snowflake-inner { width: 9px; height: 9px; }

.snowflake:nth-child(16) { left: 53%; animation-duration: 12.8s; animation-delay: 0.6s; }
.snowflake:nth-child(16) .snowflake-inner { width: 14px; height: 14px; }

.snowflake:nth-child(17) { left: 63%; animation-duration: 9.2s; animation-delay: 3.8s; }
.snowflake:nth-child(17) .snowflake-inner { width: 7px; height: 7px; }

.snowflake:nth-child(18) { left: 73%; animation-duration: 11.2s; animation-delay: 1.4s; }
.snowflake:nth-child(18) .snowflake-inner { width: 13px; height: 13px; }

.snowflake:nth-child(19) { left: 83%; animation-duration: 13.2s; animation-delay: 2.6s; }
.snowflake:nth-child(19) .snowflake-inner { width: 8px; height: 8px; }

.snowflake:nth-child(20) { left: 93%; animation-duration: 10.2s; animation-delay: 0.9s; }
.snowflake:nth-child(20) .snowflake-inner { width: 10px; height: 10px; }

.snowflake:nth-child(21) { left: 8%; animation-duration: 12.2s; animation-delay: 3.2s; }
.snowflake:nth-child(21) .snowflake-inner { width: 11px; height: 11px; }

.snowflake:nth-child(22) { left: 18%; animation-duration: 8.3s; animation-delay: 1.7s; }
.snowflake:nth-child(22) .snowflake-inner { width: 9px; height: 9px; }

.snowflake:nth-child(23) { left: 28%; animation-duration: 10.3s; animation-delay: 2.9s; }
.snowflake:nth-child(23) .snowflake-inner { width: 12px; height: 12px; }

.snowflake:nth-child(24) { left: 38%; animation-duration: 12.3s; animation-delay: 0.4s; }
.snowflake:nth-child(24) .snowflake-inner { width: 7px; height: 7px; }

.snowflake:nth-child(25) { left: 48%; animation-duration: 9.8s; animation-delay: 3.6s; }
.snowflake:nth-child(25) .snowflake-inner { width: 13px; height: 13px; }

.snowflake:nth-child(26) { left: 58%; animation-duration: 11.8s; animation-delay: 1.3s; }
.snowflake:nth-child(26) .snowflake-inner { width: 8px; height: 8px; }

.snowflake:nth-child(27) { left: 68%; animation-duration: 13.8s; animation-delay: 2.7s; }
.snowflake:nth-child(27) .snowflake-inner { width: 14px; height: 14px; }

.snowflake:nth-child(28) { left: 78%; animation-duration: 8.6s; animation-delay: 0.7s; }
.snowflake:nth-child(28) .snowflake-inner { width: 6px; height: 6px; }

.snowflake:nth-child(29) { left: 88%; animation-duration: 10.6s; animation-delay: 3.9s; }
.snowflake:nth-child(29) .snowflake-inner { width: 10px; height: 10px; }

.snowflake:nth-child(30) { left: 98%; animation-duration: 12.6s; animation-delay: 1.6s; }
.snowflake:nth-child(30) .snowflake-inner { width: 11px; height: 11px; }

.snowflake:nth-child(31) { left: 10%; animation-duration: 9.4s; animation-delay: 2.4s; }
.snowflake:nth-child(31) .snowflake-inner { width: 9px; height: 9px; }

.snowflake:nth-child(32) { left: 20%; animation-duration: 11.4s; animation-delay: 0.2s; }
.snowflake:nth-child(32) .snowflake-inner { width: 12px; height: 12px; }

.snowflake:nth-child(33) { left: 30%; animation-duration: 13.4s; animation-delay: 3.4s; }
.snowflake:nth-child(33) .snowflake-inner { width: 7px; height: 7px; }

.snowflake:nth-child(34) { left: 40%; animation-duration: 8.9s; animation-delay: 1.9s; }
.snowflake:nth-child(34) .snowflake-inner { width: 13px; height: 13px; }

.snowflake:nth-child(35) { left: 50%; animation-duration: 10.9s; animation-delay: 2.2s; }
.snowflake:nth-child(35) .snowflake-inner { width: 8px; height: 8px; }

.snowflake:nth-child(36) { left: 60%; animation-duration: 12.9s; animation-delay: 0.5s; }
.snowflake:nth-child(36) .snowflake-inner { width: 14px; height: 14px; }

.snowflake:nth-child(37) { left: 70%; animation-duration: 9.3s; animation-delay: 3.7s; }
.snowflake:nth-child(37) .snowflake-inner { width: 6px; height: 6px; }

.snowflake:nth-child(38) { left: 80%; animation-duration: 11.3s; animation-delay: 1.1s; }
.snowflake:nth-child(38) .snowflake-inner { width: 10px; height: 10px; }

.snowflake:nth-child(39) { left: 90%; animation-duration: 13.3s; animation-delay: 2.5s; }
.snowflake:nth-child(39) .snowflake-inner { width: 11px; height: 11px; }

.snowflake:nth-child(40) { left: 7%; animation-duration: 10.1s; animation-delay: 0.1s; }
.snowflake:nth-child(40) .snowflake-inner { width: 9px; height: 9px; }

.snowflake:nth-child(41) { left: 17%; animation-duration: 12.1s; animation-delay: 3.1s; }
.snowflake:nth-child(41) .snowflake-inner { width: 12px; height: 12px; }

.snowflake:nth-child(42) { left: 27%; animation-duration: 8.4s; animation-delay: 1.5s; }
.snowflake:nth-child(42) .snowflake-inner { width: 7px; height: 7px; }

.snowflake:nth-child(43) { left: 37%; animation-duration: 10.4s; animation-delay: 2.8s; }
.snowflake:nth-child(43) .snowflake-inner { width: 13px; height: 13px; }

.snowflake:nth-child(44) { left: 47%; animation-duration: 12.4s; animation-delay: 0.8s; }
.snowflake:nth-child(44) .snowflake-inner { width: 8px; height: 8px; }

.snowflake:nth-child(45) { left: 57%; animation-duration: 9.7s; animation-delay: 3.5s; }
.snowflake:nth-child(45) .snowflake-inner { width: 14px; height: 14px; }

.snowflake:nth-child(46) { left: 67%; animation-duration: 11.7s; animation-delay: 1.2s; }
.snowflake:nth-child(46) .snowflake-inner { width: 6px; height: 6px; }

.snowflake:nth-child(47) { left: 77%; animation-duration: 13.7s; animation-delay: 2.6s; }
.snowflake:nth-child(47) .snowflake-inner { width: 10px; height: 10px; }

.snowflake:nth-child(48) { left: 87%; animation-duration: 8.7s; animation-delay: 0.6s; }
.snowflake:nth-child(48) .snowflake-inner { width: 11px; height: 11px; }

.snowflake:nth-child(49) { left: 97%; animation-duration: 10.7s; animation-delay: 3.8s; }
.snowflake:nth-child(49) .snowflake-inner { width: 9px; height: 9px; }

.snowflake:nth-child(50) { left: 12%; animation-duration: 12.7s; animation-delay: 1.4s; }
.snowflake:nth-child(50) .snowflake-inner { width: 12px; height: 12px; }

.snowflake:nth-child(51) { left: 22%; animation-duration: 9.6s; animation-delay: 2.3s; }
.snowflake:nth-child(51) .snowflake-inner { width: 7px; height: 7px; }

.snowflake:nth-child(52) { left: 32%; animation-duration: 11.6s; animation-delay: 0.9s; }
.snowflake:nth-child(52) .snowflake-inner { width: 13px; height: 13px; }

.snowflake:nth-child(53) { left: 42%; animation-duration: 13.6s; animation-delay: 3.3s; }
.snowflake:nth-child(53) .snowflake-inner { width: 8px; height: 8px; }

.snowflake:nth-child(54) { left: 52%; animation-duration: 8.1s; animation-delay: 1.7s; }
.snowflake:nth-child(54) .snowflake-inner { width: 14px; height: 14px; }

.snowflake:nth-child(55) { left: 62%; animation-duration: 10.1s; animation-delay: 2.9s; }
.snowflake:nth-child(55) .snowflake-inner { width: 6px; height: 6px; }

.snowflake:nth-child(56) { left: 72%; animation-duration: 12.1s; animation-delay: 0.3s; }
.snowflake:nth-child(56) .snowflake-inner { width: 10px; height: 10px; }

.snowflake:nth-child(57) { left: 82%; animation-duration: 9.1s; animation-delay: 3.6s; }
.snowflake:nth-child(57) .snowflake-inner { width: 11px; height: 11px; }

.snowflake:nth-child(58) { left: 92%; animation-duration: 11.1s; animation-delay: 1.1s; }
.snowflake:nth-child(58) .snowflake-inner { width: 9px; height: 9px; }

.snowflake:nth-child(59) { left: 6%; animation-duration: 13.1s; animation-delay: 2.4s; }
.snowflake:nth-child(59) .snowflake-inner { width: 12px; height: 12px; }

.snowflake:nth-child(60) { left: 16%; animation-duration: 10.3s; animation-delay: 0.7s; }
.snowflake:nth-child(60) .snowflake-inner { width: 8px; height: 8px; }

.landing-container {
  min-height: 100vh;
  background: #0a0f1e;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
  overflow: hidden;
}

/* Premium Animated Background */
.bg-animated {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.bg-gradient-animated {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(251, 191, 36, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.06) 0%, transparent 70%),
    linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

/* Mesh Gradient Blobs */
.bg-mesh {
  position: absolute;
  inset: 0;
}

.mesh-gradient {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.3;
  animation: float 20s ease-in-out infinite;
}

.mesh-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%);
  top: -10%;
  left: -10%;
  animation-delay: 0s;
}

.mesh-2 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%);
  top: 20%;
  right: -15%;
  animation-delay: -5s;
}

.mesh-3 {
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.35) 0%, transparent 70%);
  bottom: -10%;
  left: 30%;
  animation-delay: -10s;
}

.mesh-4 {
  width: 550px;
  height: 550px;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%);
  bottom: 30%;
  right: 20%;
  animation-delay: -15s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(50px, -50px) scale(1.1);
  }
  50% {
    transform: translate(-30px, 30px) scale(0.9);
  }
  75% {
    transform: translate(40px, 40px) scale(1.05);
  }
}

/* Floating Particles */
.bg-particles {
  position: absolute;
  inset: 0;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.8) 0%, transparent 70%);
  border-radius: 50%;
  animation: particleFloat linear infinite;
}

.particle:nth-child(odd) {
  background: radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, transparent 70%);
}

.particle:nth-child(1) { left: 10%; animation-duration: 15s; animation-delay: 0s; }
.particle:nth-child(2) { left: 20%; animation-duration: 18s; animation-delay: -2s; }
.particle:nth-child(3) { left: 30%; animation-duration: 12s; animation-delay: -4s; }
.particle:nth-child(4) { left: 40%; animation-duration: 20s; animation-delay: -1s; }
.particle:nth-child(5) { left: 50%; animation-duration: 16s; animation-delay: -3s; }
.particle:nth-child(6) { left: 60%; animation-duration: 14s; animation-delay: -5s; }
.particle:nth-child(7) { left: 70%; animation-duration: 19s; animation-delay: -2s; }
.particle:nth-child(8) { left: 80%; animation-duration: 13s; animation-delay: -4s; }
.particle:nth-child(9) { left: 90%; animation-duration: 17s; animation-delay: -1s; }
.particle:nth-child(10) { left: 15%; animation-duration: 15s; animation-delay: -6s; }
.particle:nth-child(11) { left: 25%; animation-duration: 18s; animation-delay: -3s; }
.particle:nth-child(12) { left: 35%; animation-duration: 12s; animation-delay: -5s; }
.particle:nth-child(13) { left: 45%; animation-duration: 20s; animation-delay: -2s; }
.particle:nth-child(14) { left: 55%; animation-duration: 16s; animation-delay: -4s; }
.particle:nth-child(15) { left: 65%; animation-duration: 14s; animation-delay: -1s; }
.particle:nth-child(16) { left: 75%; animation-duration: 19s; animation-delay: -6s; }
.particle:nth-child(17) { left: 85%; animation-duration: 13s; animation-delay: -3s; }
.particle:nth-child(18) { left: 95%; animation-duration: 17s; animation-delay: -5s; }
.particle:nth-child(19) { left: 5%; animation-duration: 15s; animation-delay: -2s; }
.particle:nth-child(20) { left: 12%; animation-duration: 18s; animation-delay: -4s; }
.particle:nth-child(21) { left: 22%; animation-duration: 12s; animation-delay: -1s; }
.particle:nth-child(22) { left: 32%; animation-duration: 20s; animation-delay: -6s; }
.particle:nth-child(23) { left: 42%; animation-duration: 16s; animation-delay: -3s; }
.particle:nth-child(24) { left: 52%; animation-duration: 14s; animation-delay: -5s; }
.particle:nth-child(25) { left: 62%; animation-duration: 19s; animation-delay: -2s; }
.particle:nth-child(26) { left: 72%; animation-duration: 13s; animation-delay: -4s; }
.particle:nth-child(27) { left: 82%; animation-duration: 17s; animation-delay: -1s; }
.particle:nth-child(28) { left: 92%; animation-duration: 15s; animation-delay: -6s; }
.particle:nth-child(29) { left: 8%; animation-duration: 18s; animation-delay: -3s; }
.particle:nth-child(30) { left: 18%; animation-duration: 12s; animation-delay: -5s; }

@keyframes particleFloat {
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) scale(1);
    opacity: 0;
  }
}

/* Glowing Orbs */
.bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.2;
  animation: pulse 8s ease-in-out infinite;
}

.glow-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.6) 0%, transparent 70%);
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.glow-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, transparent 70%);
  top: 50%;
  right: 10%;
  animation-delay: -2s;
}

.glow-3 {
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, transparent 70%);
  bottom: 10%;
  left: 50%;
  animation-delay: -4s;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1) translate(0, 0);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.3) translate(20px, -20px);
    opacity: 0.4;
  }
}

/* Main Card */
.main-card-wrapper {
  position: relative;
  width: 100%;
  max-width: 28rem;
  z-index: 10;
}

.main-card {
  background: linear-gradient(to bottom, rgba(31, 41, 55, 0.5), rgba(17, 24, 39, 0.5));
  backdrop-filter: blur(24px);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(55, 65, 81, 0.5);
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 2rem;
}

.title-section {
  margin-bottom: 1.5rem;
}

.main-title {
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(90deg, #fbbf24, #fde047, #fef3c7, #fde047, #fbbf24, #f59e0b, #d97706, #f59e0b, #fbbf24);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1.2;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
  animation: gradientFlow 6s ease infinite;
  text-shadow: 0 0 30px rgba(251, 191, 36, 0.3);
}

@keyframes gradientFlow {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.year {
  font-size: 3.75rem;
  font-weight: bold;
  background: linear-gradient(135deg, #fbbf24, #f59e0b, #ec4899, #8b5cf6, #06b6d4, #10b981, #fbbf24);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-style: italic;
  animation: rainbowShift 8s ease infinite;
  text-shadow: 0 0 40px rgba(251, 191, 36, 0.4);
  filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.3));
}

@keyframes rainbowShift {
  0%, 100% {
    background-position: 0% 50%;
    filter: brightness(1) drop-shadow(0 0 10px rgba(251, 191, 36, 0.3));
  }
  25% {
    background-position: 50% 50%;
    filter: brightness(1.2) drop-shadow(0 0 15px rgba(236, 72, 153, 0.4));
  }
  50% {
    background-position: 100% 50%;
    filter: brightness(1.1) drop-shadow(0 0 15px rgba(139, 92, 246, 0.4));
  }
  75% {
    background-position: 50% 50%;
    filter: brightness(1.2) drop-shadow(0 0 15px rgba(6, 182, 212, 0.4));
  }
}

.divider {
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(234, 179, 8, 0.5), transparent);
  margin-bottom: 1rem;
}

.subtitle-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.dgp-text {
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(90deg, #fbbf24, #fde047, #fbbf24, #f59e0b, #fbbf24);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: 0.3em;
  animation: textGlow 4s ease infinite;
  filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.4));
}

@keyframes textGlow {
  0%, 100% {
    background-position: 0% 50%;
    filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.4)) brightness(1);
  }
  50% {
    background-position: 100% 50%;
    filter: drop-shadow(0 0 12px rgba(251, 191, 36, 0.6)) brightness(1.3);
  }
}

.tagline {
  font-size: 0.75rem;
  background: linear-gradient(90deg, #9ca3af, #d1d5db, #fbbf24, #d1d5db, #9ca3af);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  animation: subtleShine 5s ease infinite;
}

@keyframes subtleShine {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Zalo Section */
.zalo-section {
  margin-bottom: 1.5rem;
}

.zalo-button {
  width: 100%;
  background: linear-gradient(to right, #1f2937, #111827);
  border: 2px solid transparent;
  background-clip: padding-box;
  border-radius: 1rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.zalo-button::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 1rem;
  padding: 2px;
  background: linear-gradient(90deg, #3b82f6, #06b6d4, #8b5cf6, #ec4899, #3b82f6);
  background-size: 300% 300%;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: borderGlow 3s linear infinite;
  z-index: -1;
}

@keyframes borderGlow {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 300% 50%;
  }
}

.zalo-button:hover {
  background: linear-gradient(to right, #374151, #1f2937);
  transform: scale(1.02);
  box-shadow: 0 10px 25px -5px rgba(234, 179, 8, 0.1);
}

.zalo-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.zalo-icon {
  width: 2rem;
  height: 2rem;
  background: #3b82f6;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.875rem;
}

.zalo-info {
  text-align: left;
}

.zalo-label {
  color: #d1d5db;
  font-size: 0.875rem;
}

.zalo-number {
  color: #fbbf24;
  font-weight: bold;
}

/* Menu Section */
.menu-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.menu-item {
  width: 100%;
  background: linear-gradient(to right, rgba(31, 41, 55, 0.8), rgba(17, 24, 39, 0.8));
  border: 2px solid transparent;
  background-clip: padding-box;
  border-radius: 1rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.menu-item::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 1rem;
  padding: 2px;
  background: linear-gradient(90deg, #fbbf24, #f59e0b, #ec4899, #8b5cf6, #06b6d4, #fbbf24);
  background-size: 300% 300%;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: borderGlow 4s linear infinite;
  z-index: -1;
  opacity: 0.6;
}

.menu-item:nth-child(1)::before {
  animation-delay: 0s;
}

.menu-item:nth-child(2)::before {
  animation-delay: -1s;
}

.menu-item:nth-child(3)::before {
  animation-delay: -2s;
}

.menu-item:nth-child(4)::before {
  animation-delay: -3s;
}

.menu-item:hover {
  background: linear-gradient(to right, rgba(55, 65, 81, 0.8), rgba(31, 41, 55, 0.8));
  transform: scale(1.02);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}

.menu-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.menu-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d1d5db;
  transition: transform 0.3s ease;
}

.menu-item:hover .menu-icon {
  transform: scale(1.1);
}

.icon-bg-0 {
  background: linear-gradient(to bottom right, rgba(202, 138, 4, 0.2), rgba(161, 98, 7, 0.2));
}

.icon-bg-1 {
  background: linear-gradient(to bottom right, rgba(147, 51, 234, 0.2), rgba(126, 34, 206, 0.2));
}

.icon-bg-2 {
  background: linear-gradient(to bottom right, rgba(20, 184, 166, 0.2), rgba(8, 145, 178, 0.2));
}

.icon-bg-3 {
  background: linear-gradient(to bottom right, rgba(37, 99, 235, 0.2), rgba(29, 78, 216, 0.2));
}

.menu-text {
  flex: 1;
  text-align: left;
}

.menu-title {
  color: white;
  font-weight: bold;
  font-size: 1.125rem;
  margin-bottom: 0.25rem;
}

.menu-subtitle {
  color: #9ca3af;
  font-size: 0.75rem;
}

.menu-arrow {
  color: #4b5563;
  transition: color 0.3s ease;
}

.menu-item:hover .menu-arrow {
  color: #fbbf24;
}

/* Premium Section */
.premium-section {
  background: linear-gradient(to bottom right, rgba(31, 41, 55, 0.6), rgba(17, 24, 39, 0.6));
  border: 2px solid transparent;
  background-clip: padding-box;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
}

.premium-section::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 1rem;
  padding: 2px;
  background: linear-gradient(90deg, #fbbf24, #eab308, #fde047, #fbbf24);
  background-size: 200% 200%;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: borderGlow 2s linear infinite;
  z-index: -1;
}

.premium-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.premium-icon {
  color: #fbbf24;
}

.premium-title {
  color: white;
  font-weight: bold;
  letter-spacing: 0.05em;
}

.premium-text {
  color: #d1d5db;
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.highlight {
  color: #fbbf24;
  font-weight: 600;
}

.copy-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.link-display {
  flex: 1;
  background: rgba(17, 24, 39, 0.8);
  border: 1px solid #374151;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  color: #9ca3af;
  font-size: 0.875rem;
  font-family: 'Courier New', monospace;
}

.copy-button {
  background: linear-gradient(to right, #fbbf24, #f59e0b);
  color: black;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px -5px rgba(234, 179, 8, 0.3);
}

.copy-button:hover {
  background: linear-gradient(to right, #f59e0b, #d97706);
  transform: scale(1.05);
}

.copy-button.copied {
  background: linear-gradient(to right, #10b981, #059669);
}

/* Footer */
.footer {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid #1f2937;
}

.footer-text {
  color: #6b7280;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

.footer-brand {
  color: #eab308;
}

/* Bottom Text */
.bottom-text {
  position: absolute;
  bottom: 2rem;
  left: 0;
  right: 0;
  text-align: center;
  color: #4b5563;
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  z-index: 10;
}

/* Responsive */
@media (max-width: 640px) {
  .main-title {
    font-size: 2.5rem;
  }
  
  .year {
    font-size: 3rem;
  }
  
  .copy-section {
    flex-direction: column;
  }
  
  .copy-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
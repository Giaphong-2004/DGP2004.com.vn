<template>
  <div class="portfolio-container">
    <!-- Snow Effect -->
    <div class="snow-container">
      <div v-for="i in 50" :key="i" class="snowflake" :style="getSnowflakeStyle(i)">
        ❄
      </div>
    </div>

    <!-- Animated Background -->
    <div class="bg-animated">
      <div class="bg-gradient"></div>
      <div class="bg-glow glow-1"></div>
      <div class="bg-glow glow-2"></div>
    </div>

    <div class="content-wrapper">
      <!-- Header - Zalo Contact -->
      <div class="zalo-header" @click="handleZaloClick">
        <div class="zalo-icon-wrapper">
          <div class="zalo-icon">Z</div>
        </div>
        <div class="zalo-info">
          <div class="zalo-label">Zalo Admin</div>
          <div class="zalo-number">0369620631</div>
        </div>
      </div>

      <!-- Profile Card -->
      <div class="profile-card">
        <!-- Avatar -->
        <div class="avatar-section">
          <div class="avatar-wrapper">
            <div class="avatar-border">
              <div class="avatar-inner">
                <User :size="48" />
              </div>
            </div>
            <div class="avatar-badge">
              <CheckCircle :size="20" />
            </div>
          </div>
        </div>

        <!-- Name & Title -->
        <div class="profile-info">
          <div class="profile-subtitle">MASTERPIECE OF SYSTEMS</div>
          <h1 class="profile-name">ĐỖ GIA PHONG</h1>
          <div class="profile-title">Senior System Architect • 2024 Edition</div>
          <p class="profile-description">
            Xây dựng các hệ thống phần mềm chuyên nghiệp với hiệu suất cao, 
            bảo mật tối đa và trải nghiệm người dùng tuyệt vời
          </p>
        </div>

        <!-- Skills Section -->
        <div class="skills-section">
          <div class="section-badge">Kỹ Năng Master</div>
          
          <div class="skills-grid">
            <button 
              v-for="(skill, index) in skills" 
              :key="index"
              class="skill-card"
            >
              <div class="skill-content">
                <div class="skill-icon" :class="`icon-${index}`">
                  <component :is="skill.icon" :size="24" />
                </div>
                <div class="skill-text">
                  <div class="skill-title">{{ skill.title }}</div>
                  <div class="skill-subtitle">{{ skill.subtitle }}</div>
                </div>
                <div class="skill-arrow">→</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Projects Section -->
      <div class="projects-section">
        <div class="section-badge-center">Dự Án Tiêu Biểu</div>

        <div 
          v-for="(project, index) in projects" 
          :key="index"
          class="project-card"
        >
          <div class="project-badge">AUTOMATION</div>
          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-description">{{ project.description }}</p>
          <div class="project-tags">
            <span 
              v-for="(tag, i) in project.tags" 
              :key="i"
              class="project-tag"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- Timeline Section -->
      <div class="timeline-section">
        <div class="section-badge-center">Luồng Hệ Thống</div>

        <div class="timeline-card">
          <div class="timeline-items">
            <div 
              v-for="(item, index) in timeline" 
              :key="index"
              class="timeline-item"
            >
              <div class="timeline-icon-wrapper">
                <component :is="item.icon" :size="28" />
              </div>
              <div class="timeline-label">{{ item.label }}</div>
              <div v-if="index < timeline.length - 1" class="timeline-line"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="contact-section">
        <MessageCircle :size="32" class="contact-icon" />
        <h3 class="contact-title">Liên Hệ Ngay</h3>
        <p class="contact-description">
          Sẵn sàng xây dựng hệ thống cho bạn với chất lượng 24K
        </p>
        <button @click="handleZaloClick" class="contact-button">
          CHAT ZALO NGAY
        </button>
      </div>

      <!-- Footer -->
      <div class="footer">
        © 2024 ĐỖ GIA PHONG • REFINED STANDARDS
      </div>
    </div>
  </div>
</template>

<script setup>
import { Code, Database, Shield, User, CheckCircle, Clock, Award, MessageCircle } from 'lucide-vue-next'

const skills = [
  {
    icon: Code,
    title: 'Frontend Architecture',
    subtitle: 'REACT • NEXT.JS • TAILWIND'
  },
  {
    icon: Database,
    title: 'Backend Engineering',
    subtitle: 'NODE.JS • PYTHON • CLOUD'
  },
  {
    icon: Database,
    title: 'Advanced Database',
    subtitle: 'MONGODB • POSTGRESQL • REDIS'
  },
  {
    icon: Shield,
    title: 'Security & Crypto',
    subtitle: 'OAUTH • JWT • ENCRYPTION'
  }
]

const projects = [
  {
    title: 'Hệ Thống Bán Acc Tự Động',
    description: 'Tích hợp thanh toán QR Code, quản lý tài khoản, tăng doanh thu lên 300%',
    tags: ['#NODE.JS', '#REACT', '#MONGODB']
  },
  {
    title: 'Nền Tảng Mạng Xã Hội',
    description: 'Xây dựng social media với thời gian thực, chat, notification',
    tags: ['#VUE.JS', '#SOCKET.IO', '#POSTGRESQL']
  }
]

const timeline = [
  { icon: User, label: 'NGƯỜI DÙNG' },
  { icon: CheckCircle, label: 'CÔNG THANH TOÁN' },
  { icon: Clock, label: 'XỬ LÝ LOGIC' },
  { icon: Award, label: 'ADMIN CONTROL' }
]

const handleZaloClick = () => {
  window.open('https://zalo.me/0369620631', '_blank')
}

const getSnowflakeStyle = (i) => {
  return {
    left: `${Math.random() * 100}%`,
    animationDuration: `${3 + Math.random() * 5}s`,
    animationDelay: `${Math.random() * 3}s`,
    fontSize: `${10 + Math.random() * 20}px`,
    opacity: 0.3 + Math.random() * 0.7
  }
}
</script>

<style scoped>
.portfolio-container {
  min-height: 100vh;
  background: #0a0a0a;
  position: relative;
  overflow: hidden;
  padding: 1.5rem;
}

/* Snow Effect */
.snow-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 20;
}

.snowflake {
  position: absolute;
  top: -10px;
  color: white;
  user-select: none;
  animation: snowfall linear infinite;
}

@keyframes snowfall {
  0% {
    transform: translateY(-10px) rotate(0deg);
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
  }
}

/* Animated Background */
.bg-animated {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.bg-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.05) 0%, transparent 50%, rgba(168, 85, 247, 0.05) 100%);
  animation: gradientShift 8s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.15;
  animation: pulse 8s ease-in-out infinite;
}

.glow-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.6) 0%, transparent 70%);
  top: 25%;
  left: 25%;
}

.glow-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, transparent 70%);
  bottom: 25%;
  right: 25%;
  animation-delay: -4s;
}

@keyframes pulse {
  0%, 100% { 
    transform: scale(1);
    opacity: 0.15;
  }
  50% { 
    transform: scale(1.3);
    opacity: 0.25;
  }
}

/* Content Wrapper */
.content-wrapper {
  position: relative;
  z-index: 10;
  max-width: 28rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Zalo Header */
.zalo-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(to right, rgba(31, 41, 55, 0.8), rgba(17, 24, 39, 0.8));
  backdrop-filter: blur(24px);
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid rgba(234, 179, 8, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.zalo-header:hover {
  border-color: rgba(234, 179, 8, 0.4);
  transform: scale(1.02);
}

.zalo-icon-wrapper {
  flex-shrink: 0;
}

.zalo-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(to bottom right, #3b82f6, #2563eb);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.25rem;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.zalo-info {
  flex: 1;
}

.zalo-label {
  font-size: 0.75rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.zalo-number {
  font-size: 1.125rem;
  font-weight: bold;
  color: #fbbf24;
}

/* Profile Card */
.profile-card {
  background: linear-gradient(to bottom right, rgba(31, 41, 55, 0.8), rgba(17, 24, 39, 0.8));
  backdrop-filter: blur(24px);
  border-radius: 1.5rem;
  border: 1px solid rgba(234, 179, 8, 0.2);
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
}

/* Avatar Section */
.avatar-section {
  display: flex;
  justify-content: center;
  padding-top: 2rem;
  padding-bottom: 1rem;
}

.avatar-wrapper {
  position: relative;
}

.avatar-border {
  width: 8rem;
  height: 8rem;
  background: linear-gradient(135deg, #fbbf24, #f59e0b, #fbbf24);
  border-radius: 50%;
  padding: 4px;
  box-shadow: 0 8px 24px rgba(251, 191, 36, 0.3);
}

.avatar-inner {
  width: 100%;
  height: 100%;
  background: #111827;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fbbf24;
}

.avatar-badge {
  position: absolute;
  bottom: -0.5rem;
  right: -0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(to bottom right, #fbbf24, #f59e0b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
}

/* Profile Info */
.profile-info {
  text-align: center;
  padding: 0 1.5rem 1.5rem;
}

.profile-subtitle {
  font-size: 0.75rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 0.5rem;
}

.profile-name {
  font-size: 2.5rem;
  font-weight: bold;
  background: linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 0.5rem;
  animation: gradientFlow 4s ease infinite;
}

@keyframes gradientFlow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.profile-title {
  font-size: 0.75rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.profile-description {
  font-size: 0.875rem;
  color: #d1d5db;
  line-height: 1.6;
  padding: 0 1rem;
}

/* Skills Section */
.skills-section {
  padding: 0 1.5rem 1.5rem;
}

.section-badge {
  display: inline-block;
  width: 100%;
  text-align: center;
  padding: 0.5rem 1rem;
  background: rgba(234, 179, 8, 0.1);
  border: 1px solid rgba(234, 179, 8, 0.3);
  border-radius: 2rem;
  color: #fbbf24;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skill-card {
  width: 100%;
  background: linear-gradient(to right, rgba(31, 41, 55, 0.6), rgba(17, 24, 39, 0.6));
  backdrop-filter: blur(12px);
  border: 1px solid rgba(55, 65, 81, 0.5);
  border-radius: 0.75rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.skill-card:hover {
  border-color: rgba(234, 179, 8, 0.4);
  transform: scale(1.02);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.skill-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.skill-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-0 {
  background: linear-gradient(to bottom right, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.2));
  color: #fbbf24;
}

.icon-1 {
  background: linear-gradient(to bottom right, rgba(168, 85, 247, 0.2), rgba(147, 51, 234, 0.2));
  color: #a855f7;
}

.icon-2 {
  background: linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.2));
  color: #3b82f6;
}

.icon-3 {
  background: linear-gradient(to bottom right, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.2));
  color: #22c55e;
}

.skill-text {
  flex: 1;
  text-align: left;
}

.skill-title {
  font-weight: bold;
  color: white;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.skill-subtitle {
  font-size: 0.75rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.skill-arrow {
  color: #6b7280;
  font-size: 1.25rem;
  transition: color 0.3s ease;
}

.skill-card:hover .skill-arrow {
  color: #fbbf24;
}

/* Projects Section */
.projects-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-badge-center {
  display: inline-block;
  align-self: center;
  padding: 0.5rem 1rem;
  background: linear-gradient(to right, rgba(31, 41, 55, 0.8), rgba(17, 24, 39, 0.8));
  backdrop-filter: blur(24px);
  border: 1px solid rgba(234, 179, 8, 0.2);
  border-radius: 2rem;
  color: #fbbf24;
  font-size: 0.875rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.project-card {
  background: linear-gradient(to bottom right, rgba(31, 41, 55, 0.6), rgba(17, 24, 39, 0.6));
  backdrop-filter: blur(24px);
  border: 1px solid rgba(234, 179, 8, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.project-card:hover {
  transform: scale(1.02);
  border-color: rgba(234, 179, 8, 0.4);
}

.project-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(234, 179, 8, 0.2);
  border-radius: 2rem;
  color: #fbbf24;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

.project-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #fbbf24;
  margin-bottom: 0.5rem;
}

.project-description {
  font-size: 0.875rem;
  color: #d1d5db;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project-tag {
  padding: 0.25rem 0.75rem;
  background: rgba(17, 24, 39, 0.5);
  border: 1px solid rgba(55, 65, 81, 0.5);
  border-radius: 0.5rem;
  font-size: 0.75rem;
  color: #9ca3af;
}

/* Timeline Section */
.timeline-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.timeline-card {
  background: linear-gradient(to bottom right, rgba(31, 41, 55, 0.8), rgba(17, 24, 39, 0.8));
  backdrop-filter: blur(24px);
  border: 1px solid rgba(234, 179, 8, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.timeline-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.timeline-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-icon-wrapper {
  width: 4rem;
  height: 4rem;
  background: linear-gradient(to bottom right, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.2));
  border: 1px solid rgba(234, 179, 8, 0.3);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fbbf24;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.2);
}

.timeline-icon-wrapper:hover {
  transform: scale(1.1);
}

.timeline-label {
  margin-top: 0.75rem;
  font-size: 0.75rem;
  font-weight: bold;
  color: #d1d5db;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;
}

.timeline-line {
  position: absolute;
  top: 5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 2rem;
  background: linear-gradient(to bottom, rgba(234, 179, 8, 0.5), transparent);
}

/* Contact Section */
.contact-section {
  background: linear-gradient(to bottom right, rgba(31, 41, 55, 0.8), rgba(17, 24, 39, 0.8));
  backdrop-filter: blur(24px);
  border: 1px solid rgba(234, 179, 8, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.contact-icon {
  color: #fbbf24;
  margin: 0 auto 0.75rem;
}

.contact-title {
  font-size: 1.125rem;
  font-weight: bold;
  color: #fbbf24;
  margin-bottom: 0.5rem;
}

.contact-description {
  font-size: 0.875rem;
  color: #9ca3af;
  margin-bottom: 1rem;
}

.contact-button {
  width: 100%;
  background: linear-gradient(to right, #fbbf24, #f59e0b);
  color: black;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
}

.contact-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(251, 191, 36, 0.4);
}

/* Footer */
.footer {
  text-align: center;
  padding: 1rem 0;
  font-size: 0.75rem;
  color: #6b7280;
  letter-spacing: 0.05em;
}
</style>
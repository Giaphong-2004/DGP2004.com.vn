import { createRouter, createWebHistory } from 'vue-router'
import Portfolio from '../components/Portfolio.vue'
import CaptchaFrontend from '../views/CaptchaFrontend.vue'
import CaptchaBackend from '../views/CaptchaBackend.vue'
import CaptchaDatabase from '../views/CaptchaDatabase.vue'
import CaptchaSecurity from '../views/CaptchaSecurity.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Portfolio
  },
  {
    path: '/captcha-frontend',
    name: 'CaptchaFrontend',
    component: CaptchaFrontend
  },
  {
    path: '/captcha-backend',
    name: 'CaptchaBackend',
    component: CaptchaBackend
  },
  {
    path: '/captcha-database',
    name: 'CaptchaDatabase',
    component: CaptchaDatabase
  },
  {
    path: '/captcha-security',
    name: 'CaptchaSecurity',
    component: CaptchaSecurity
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
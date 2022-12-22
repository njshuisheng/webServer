import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus, { ClickOutside, ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from './views/layout.vue'
import Home from './views/home.vue'
import News from './views/news.vue'
import Good from './views/good.vue'
import Wo from './views/wo.vue'
import Comp from './views/comp.vue'
import Login from './views/login.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'layout',
      path: '/layout',
      component: Layout,
      redirect: '/home',
      children: [
        {
          name: 'home',
          path: '/home',
          component: Home,
        },
        {
          name: 'news',
          path: '/news',
          component: News,
        },
        {
          name: 'good',
          path: '/good',
          component: Good,
        },
        {
          name: 'wo',
          path: '/wo',
          component: Wo,
        },
        {
          name: 'comp',
          path: '/comp',
          component: Comp,
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'login',
      path: '/',
      component: Login
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    if (localStorage.getItem('__login__') === 'abc') {
      next()
    } else {
      ElMessage.warning('未登录！')

      setTimeout(() => {
        router.push('/')
      }, 1000)
    }
  }
})

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.directive('click-outside', ClickOutside)
app.mount('#app')

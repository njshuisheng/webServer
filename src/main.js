import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus, { ClickOutside, ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from './views/layout.vue'
import Login from './views/login.vue'
import Shouye from './views/shouye.vue'
import Xinwen from './views/xinwen.vue'
import Chanpin from './views/chanpin.vue'
import Women from './views/women.vue'
import Jieshao from './views/jieshao.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'layout',
      path: '/layout',
      component: Layout,
      redirect: '/shouye',
      children: [
        {
          name: 'shouye',
          path: '/shouye',
          component: Shouye,
        },
        {
          name: 'xinwen',
          path: '/xinwen',
          component: Xinwen,
        },
        {
          name: 'chanpin',
          path: '/chanpin',
          component: Chanpin,
        },
        {
          name: 'women',
          path: '/women',
          component: Women,
        },
        {
          name: 'jieshao',
          path: '/jieshao',
          component: Jieshao,
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

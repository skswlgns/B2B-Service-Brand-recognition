import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from "../views/Home.vue";
import Ranking from '@/components/Ranking.vue'
import Recommend from '@/components/Recommend.vue'
import MyAnalysis from '@/views/MyAnalysis.vue'
import Login from '../views/Login.vue'
import Main from '@/views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/MyAnalysis',
    name: 'MyAnalysis',
    component: MyAnalysis
  },
  {
    path: '/Ranking',
    name: 'Ranking',
    component: Ranking
  },
  {
    path: '/Recommend',
    name: 'Recommend',
    component: Recommend
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter(to, from, next) {
      if (Vue.$cookies.isKey('token')) {
        next('/')
      } else {
        next()
      }
    }
  },

  // 지훈

  // main
  {
    path: '/',
    name: 'Main',
    component: Main
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

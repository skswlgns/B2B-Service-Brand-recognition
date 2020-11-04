import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from "../views/Home.vue";
import Ranking from '@/components/Ranking.vue'
import Recommend from '@/components/Recommend.vue'
import MyAnalysis from '@/views/MyAnalysis.vue'
import Search from '@/views/Search.vue'
import SearchVideo from '@/components/SearchVideo.vue'
import SearchChannel from '@/components/SearchChannel.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/searchVideo',
    name: 'SearchVideo',
    component: SearchVideo
  },
  {
    path: '/searchChannel',
    name: 'SearchChannel',
    component: SearchChannel
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/myAnalysis',
    name: 'MyAnalysis',
    component: MyAnalysis
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: Ranking
  },
  {
    path: '/recommend',
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

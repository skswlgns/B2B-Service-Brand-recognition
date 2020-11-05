import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from "../views/Home.vue";
import Ranking from '@/components/Ranking.vue'
import Recommend from '@/components/Recommend.vue'
import SearchVideo from '@/components/SearchVideo.vue'
import SearchChannel from '@/components/SearchChannel.vue'
import ScrapVideo from '@/components/ScrapVideo.vue'
import ScrapChannel from '@/components/ScrapChannel.vue'

import MyPage from '@/views/MyPage.vue'
import MyAnalysis from '@/views/MyAnalysis.vue'
import Search from '@/views/Search.vue'
import Login from '../views/Login.vue'
import Main from '@/views/Main.vue'
import VideoDetail from '@/views/VideoDetail.vue'
import Main1 from '@/views/Main1.vue'
import Channel from '@/views/Channel.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/myPage',
    name: 'MyPage',
    component: MyPage
  },
  {
    path: '/scrapVideo',
    name: 'ScrapVideo',
    component: ScrapVideo
  },
  {
    path: '/scrapChannel',
    name: 'ScrapChannel',
    component: ScrapChannel
  },
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
  // 도희
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter(to, from, next) {
      if (Vue.$cookies.isKey('token')) {
        next('/whole')
      } else {
        next()
      }
    }
  },
  {
    path: '/whole',
    name: 'Whole',
    component: Main1
  },
  {
    path: '/channel',
    name: 'Channel',
    component: Channel
  },

  // 지훈

  // main
  {
    path: '/',
    name: 'Main',
    component: Main
  },

  // 용욱
  {
    path: '/video/:video_youtube_id',
    name: 'VideoDetail',
    component: VideoDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

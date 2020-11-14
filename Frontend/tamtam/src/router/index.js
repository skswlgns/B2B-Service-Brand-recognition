import Vue from 'vue'
import VueRouter from 'vue-router'
import Ranking from '@/components/Ranking.vue'
import Recommend from '@/components/Recommend.vue'
import SearchVideo from '@/components/SearchVideo.vue'
import SearchChannel from '@/components/SearchChannel.vue'
import ScrapVideo from '@/components/ScrapVideo.vue'
import ScrapChannel from '@/components/ScrapChannel.vue'
import ContactChannel from '@/components/ContactChannel.vue'

import MyPage from '@/views/MyPage.vue'
import MyAnalysis from '@/views/MyAnalysis.vue'
import Search from '@/views/Search.vue'
import Login from '@/views/Login.vue'
import Main from '@/views/Main.vue'
import VideoDetail from '@/views/VideoDetail.vue'
import Main1 from '@/views/Main1.vue'
import Channel from '@/views/Channel.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import Utuberank from '@/views/Utuberank.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/contactChannel',
    name: 'ContactChannel',
    component: ContactChannel,
    beforeEnter(to, from, next) {
      if (!Vue.$cookies.isKey('token')) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/myPage',
    name: 'MyPage',
    component: MyPage,
    beforeEnter(to, from, next) {
      if (!Vue.$cookies.isKey('token')) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/scrapVideo',
    name: 'ScrapVideo',
    component: ScrapVideo,
    beforeEnter(to, from, next) {
      if (!Vue.$cookies.isKey('token')) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/scrapChannel',
    name: 'ScrapChannel',
    component: ScrapChannel,
    beforeEnter(to, from, next) {
      if (!Vue.$cookies.isKey('token')) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/searchVideo',
    name: 'SearchVideo',
    component: SearchVideo,
    beforeEnter(to, from, next) {
      if (!Vue.$cookies.isKey('token')) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/searchChannel',
    name: 'SearchChannel',
    component: SearchChannel,
    beforeEnter(to, from, next) {
      if (!Vue.$cookies.isKey('token')) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/search/:text',
    name: 'Search',
    component: Search,
    beforeEnter(to, from, next) {
      if (!Vue.$cookies.isKey('token')) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/myAnalysis',
    name: 'MyAnalysis',
    component: MyAnalysis,
    beforeEnter(to, from, next) {
      if (!Vue.$cookies.isKey('token')) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: Ranking,
    beforeEnter(to, from, next) {
      if (!Vue.$cookies.isKey('token')) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend,
    beforeEnter(to, from, next) {
      if (!Vue.$cookies.isKey('token')) {
        next('/login')
      } else {
        next()
      }
    }
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
    component: Main1,
    beforeEnter(to, from, next) {
      if (!Vue.$cookies.isKey('token')) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/channel/:channelId',
    name: 'Channel',
    component: Channel,
    props: true,
    beforeEnter(to, from, next) {
      if (!Vue.$cookies.isKey('token')) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/rank/:subject',
    name: 'Utuberank',
    component: Utuberank,
    props: true,
    beforeEnter(to, from, next) {
      if (!Vue.$cookies.isKey('token')) {
        next('/login')
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
    component: Main,
    beforeEnter(to, from, next) {
      if (Vue.$cookies.isKey('token')) {
        next('/whole')
      } else {
        next()
      }
    }
  },

  // 404
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    name: 'PageNotFound',
    component: PageNotFound
  },

  // 용욱
  {
    path: '/video/:video_youtube_id',
    name: 'VideoDetail',
    component: VideoDetail,
    beforeEnter(to, from, next) {
      if (!Vue.$cookies.isKey('token')) {
        next('/login')
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

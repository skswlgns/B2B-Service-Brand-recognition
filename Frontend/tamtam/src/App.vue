<template>
  <v-app>
    <div class="app-main-grid" v-if="$route.name !== 'Main' && $route.name !== 'Login'">
      <nav class="navbar" v-if="$route.name !== 'Login' && $route.name !== 'Main' && $route.name !== 'PageNotFound'">
        <div>
          <router-link to="/home" class="logo">TamTam</router-link>
          <div class="searchbar">
            <span class="icon"><i class="fa fa-search"></i></span>
            <input type="text" placeholder="검색내용을 입력해주세요." v-model="text" @keyup.enter="searching()" />
          </div>
          <router-link class="menu" to="/home">전체 기업 분석</router-link>
          <router-link class="menu" to="/myAnalysis">내 기업 분석</router-link>

          <router-link class="menu" to="/myPage">My Page</router-link>
          <router-link class="menu" to="/rank/subscribes">순위</router-link>
        </div>
        <v-divider></v-divider>
        <div class="mb-6">
          <p class="white--text mb-2">WELCOME!</p>
          <div class="white--text mb-6">{{ user_nickname }} :)</div>
          <v-btn class="logout" elevation="4" rounded outlined @click="logout()">Log Out</v-btn>
        </div>
      </nav>
      <div class="app-container">
        <router-view :key="$route.fullPath" />
      </div>
    </div>
    <div v-else>
      <router-view />
    </div>
    <GoTop></GoTop>
  </v-app>
</template>
<script>
import cookies from 'vue-cookies'
import { mapState, mapActions } from 'vuex'
import GoTop from '@/components/GoTop.vue'
// import { use } from 'vue/types/umd'
const userStore = 'userStore'
const searchStore = 'searchStore'
export default {
  name: 'App',
  data: () => ({
    text: ''
  }),
  components: {
    GoTop
  },
  computed: {
    ...mapState(userStore, ['user_nickname'])
  },
  methods: {
    searching() {
      this.text = this.text.trim()
      if (this.text !== '') {
        cookies.set('searchText', this.text)
        this.search(this.text)
        this.text = ''
      } else {
        alert('검색어 또는 동영상 URL을 입력해주세요.')
      }
    },
    ...mapActions(userStore, ['logout']),
    ...mapActions(searchStore, ['search'])
  },
  created() {},
  mounted() {}
}
</script>

<style lang="scss" scpoed>
@import './scss/common.scss';
@import './scss/app.scss';
</style>

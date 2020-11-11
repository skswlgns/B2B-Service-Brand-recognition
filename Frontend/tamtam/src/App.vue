<template>
  <v-app>
    <div class="app-main-grid" v-if="$route.name !== 'Main' && $route.name !== 'Login'">
      <nav class="navbar" v-if="$route.name !== 'Login' && $route.name !== 'Main' && $route.name !== 'PageNotFound'">
        <div>
          <router-link to="/whole" class="logo">TamTam</router-link>
          <div class="searchbar">
            <span class="icon"><i class="fa fa-search"></i></span>
            <input type="text" placeholder="검색내용을 입력해주세요." v-model="text" @keyup.enter="searching()" />
          </div>
          <router-link class="menu" to="/whole">전체 기업 분석</router-link>
          <router-link class="menu" to="/myAnalysis">내 기업 분석</router-link>
          <router-link class="menu" to="/myPage">My Page</router-link>
        </div>
        <div>
          <div>{{ user_nickname }}</div>
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
  </v-app>
</template>

<script>
import cookies from 'vue-cookies'
import { mapState, mapActions } from 'vuex'
const userStore = 'userStore'
const searchStore = 'searchStore'

export default {
  name: 'App',
  data: () => ({
    text: ''
  }),
  created() {},
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
  computed: {
    ...mapState(userStore, ['user_nickname'])
  },
  mounted() {}
}
</script>

<style lang="scss" scpoed>
@import './scss/common.scss';
@import './scss/nav.scss';
</style>

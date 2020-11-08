<template>
  <v-app>
<<<<<<< HEAD
    <nav v-if="$route.name !== 'Login' && $route.name !== 'Main'" class="menu">
      <router-link to="/whole" class="brand">TamTam</router-link>
=======
    <nav class="menu" v-if="$route.name !== 'Login' && $route.name !== 'Main' && $route.name !== 'PageNotFound'">
      <span>TamTam</span>
>>>>>>> 4393c8808b6f4a3ecf14679946f8e06f42c1a834
      <span>
        <span class="icon"><i class="fa fa-search"></i></span>
        <input
          type="text"
          v-model="searchText"
          placeholder="검색 또는 동영상 URL을 입력해주세요."
          @keyup.enter="moveSearch"
        />
      </span>
      <menu>
        <menuitem id="demo1">
          <div>{{ user_nickname }}<i class="fas fa-caret-down"></i></div>
          <menu>
            <menuitem><router-link to="/whole">전체 기업 분석</router-link></menuitem>
            <menuitem><router-link to="/myAnalysis">내 기업 분석</router-link></menuitem>
            <menuitem><router-link to="#">My Page</router-link></menuitem>
            <menuitem
              ><div class="logout" @click="logout()">
                Log Out
              </div></menuitem
            >
          </menu>
        </menuitem>
      </menu>
    </nav>
    <!-- <v-container v-if="$route.path === '/'">
      <Main1 />
    </v-container> -->
    <router-view v-if="$route.name === 'Main'" />
    <v-container v-if="$route.name !== 'Main'">
      <router-view :key="$route.fullPath" />
    </v-container>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
const userStore = 'userStore'

export default {
  name: 'App',
  data: () => ({
    searchText: ''
  }),
  methods: {
    moveSearch() {
      if (this.searchText === '') {
        alert('검색어 또는 동영상 URL을 입력해주세요.')
      } else {
        this.$router.push({ name: 'Search', params: { text: this.searchText } })
        this.searchText = ''
      }
    },
    ...mapActions(userStore, ['logout'])
  },
  computed: {
    ...mapState(userStore, ['user_nickname'])
  }
}
</script>

<style lang="scss" scpoed>
@import './scss/common.scss';
@import './scss/nav.scss';
</style>

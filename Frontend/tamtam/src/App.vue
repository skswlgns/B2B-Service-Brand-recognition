<template>
  <v-app>
    <nav v-if="$route.name !== 'Login' && $route.name !== 'Main' && $route.name !== 'PageNotFound'" class="menu">
      <router-link to="/whole" class="brand">TamTam</router-link>
      <span>
        <span class="icon"><i class="fa fa-search"></i></span>
        <input
          type="text"
          placeholder="검색 또는 동영상 URL을 입력해주세요."
          v-model="text"
          @keyup.enter="searching()"
        />
      </span>
      <menu>
        <menuitem id="demo1">
          <div>{{ user_nickname }}<i class="fas fa-caret-down"></i></div>
          <menu>
            <menuitem><router-link to="/whole">전체 기업 분석</router-link></menuitem>
            <!-- <menuitem><router-link to="/myAnalysis">내 기업 분석</router-link></menuitem> -->
            <menuitem><router-link to="/myPage">My Page</router-link></menuitem>
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
    <a href="#" style="display:scroll;position:fixed; bottom:15px;right:15px;">
      Top
    </a>
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
  mounted() {
    console.log(this.user_nickname)
  }
}
</script>

<style lang="scss" scpoed>
@import './scss/common.scss';
@import './scss/nav.scss';
</style>

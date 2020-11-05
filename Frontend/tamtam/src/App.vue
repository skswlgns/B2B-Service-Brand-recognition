<template>
  <v-app>
    <nav v-if="$route.name !== 'Login'" class="menu">
      <span class="logo">TamTam</span>
      <span>
        <span class="icon"><i class="fa fa-search"></i></span>
        <input type="text" placeholder="검색 또는 동영상 URL을 입력해주세요." />
      </span>
      <menu>
        <menuitem id="demo1">
          <div>{{ user_nickname }}<i class="fas fa-caret-down"></i></div>
          <menu>
            <menuitem
              ><router-link to="#">전체 기업 분석</router-link></menuitem
            >
            <menuitem><router-link to="#">내 기업 분석</router-link></menuitem>
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
    <v-container v-if="$route.path === '/'">
      <Main1 />
    </v-container>
    <v-container>
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Main1 from './components/Main1.vue'
const userStore = 'userStore'

export default {
  name: 'App',
  components: {
    Main1
  },
  data: () => ({
    //
  }),
  computed: {
    ...mapState(userStore, ['user_nickname'])
  },
  methods: {
    ...mapActions(userStore, ['logout'])
  }
}
</script>

<style lang="scss">
@import './scss/reset.scss';
@import './scss/nav.scss';
</style>

<style scoped>
span a {
  color: aliceblue;
  text-decoration: none;
}
</style>

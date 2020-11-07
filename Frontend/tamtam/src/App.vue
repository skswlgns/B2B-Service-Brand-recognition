<template>
  <v-app>
    <nav class="menu" v-if="$route.name !== 'Login' && $route.name !== 'Main'">
      <span>TamTam</span>
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
const searchStore = 'searchStore'

export default {
  name: 'App',
  data: () => ({
    text: ''
  }),
  created() {},
  mounted() {},
  methods: {
    searching() {
      this.search(this.text)
      this.text = ''
    },
    ...mapActions(userStore, ['logout']),
    ...mapActions(searchStore, ['search'])
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

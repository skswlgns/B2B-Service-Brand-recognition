<template>
  <v-app>
    <nav>
      <span><router-link to="/">TamTam</router-link></span>
      <span><router-link to="/MyAnalysis">내 기업 분석</router-link></span>
      <span>전체 기업 분석</span>
      <span>SAMSUNG</span>
      <span>
        <span class="icon"><i class="fa fa-search"></i></span>
        <input type="text" placeholder="검색 또는 동영상 URL을 입력해주세요." />
      </span>
    </nav>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data: () => ({
    //
  })
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

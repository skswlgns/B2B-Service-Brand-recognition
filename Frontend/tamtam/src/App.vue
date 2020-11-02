<template>
  <v-app>
    <nav v-if="$route.name !== 'Login'">
      <span>TamTam</span>
      <span>
        <span class="icon"><i class="fa fa-search"></i></span>
        <input type="text" placeholder="검색 또는 동영상 URL을 입력해주세요." />
      </span>
      <menu>
        <menuitem id="demo1">
          <a>SAMSUNG</a>
          <menu>
            <menuitem
              ><rotuer-link to="/#">전체 기업 분석</rotuer-link></menuitem
            >
            <menuitem><rotuer-link to="/#">내 기업 분석</rotuer-link></menuitem>
            <menuitem><rotuer-link to="/#">My Page</rotuer-link></menuitem>
            <menuitem><rotuer-link to="/#">Log Out</rotuer-link></menuitem>
          </menu>
        </menuitem>
      </menu>
      <!-- <span>내 기업 분석</span>
      <span>전체 기업 분석</span>
      <span><router-link to="/login">로그인</router-link></span>
      <span>
        <span class="icon"><i class="fa fa-search"></i></span>
        <input type="text" placeholder="검색 또는 동영상 URL을 입력해주세요." />
      </span> -->
    </nav>
    <v-container>
      <router-view />
    </v-container>
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

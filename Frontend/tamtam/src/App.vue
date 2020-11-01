<template>
  <v-app>
    <nav>
      <span>TamTam</span>
      <span>내 기업 분석</span>
      <span>전체 기업 분석</span>
      <span>SAMSUNG</span>
      <span>
        <span class="icon"><i class="fa fa-search"></i></span>
        <input type="text" placeholder="검색 또는 동영상 URL을 입력해주세요." />
      </span>
    </nav>
  </v-app>

</template>

<script>
export default {
  name: "App",
  components: {
  },
  data: () => ({
    //
  })
};
</script>

<style lang="scss">
@import "./scss/reset.scss";
@import "./scss/nav.scss";
</style>

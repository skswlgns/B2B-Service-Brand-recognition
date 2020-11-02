<template>
  <v-app style="padding-top: 24px;">
    <v-container pa-4 >
      <h1 style="font-size:46px;">'{{ this.searchText }}'로 검색한 결과입니다.</h1>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "Search",
  components: {},
  data: () => ({
    searchText: "",
  }),
  created() {
    this.searchText = this.$route.query.text;
  },
};
</script>

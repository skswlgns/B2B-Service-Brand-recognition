<template>
  <v-app>
    <v-container>
      <h1 style="font-size:32px; padding-top:32px; padding-bottom: 32px;">
        '{{ this.searchText }}'(으)로 검색한 결과입니다.
      </h1>
      <SearchChannel></SearchChannel>
      <SearchVideo v-bind:title="this.searchText"></SearchVideo>
    </v-container>
  </v-app>
</template>

<script>
import SearchVideo from '@/components/SearchVideo.vue'
import SearchChannel from '@/components/SearchChannel.vue'

export default {
  name: 'Search',
  components: {
    SearchVideo,
    SearchChannel
  },
  data: () => ({
    searchText: ''
  }),
  created() {
    this.searchText = this.$route.query.text
  }
}
</script>

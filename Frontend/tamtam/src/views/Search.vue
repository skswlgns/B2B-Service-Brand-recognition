<template>
  <v-app>
    <div>
      <h1 style="font-size:24px; padding-top:24px; padding-bottom: 8px;">
        '{{ this.searchText }}'(으)로 검색한 결과입니다.
      </h1>
      <SearchChannel v-bind:title="this.searchText"></SearchChannel>
      <SearchVideo v-bind:title="this.searchText"></SearchVideo>
    </div>
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
    this.searchText = this.$route.params.text
  }
}
</script>

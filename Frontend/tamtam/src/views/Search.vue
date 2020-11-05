<template>
  <div>
    <div>
      <div class="card-title">'{{ this.searchText }}'(으)로 검색한 결과입니다.</div>
      <SearchChannel v-bind:title="this.searchText"></SearchChannel>
      <div class="card-title"></div>
      <SearchVideo v-bind:title="this.searchText"></SearchVideo>
    </div>
  </div>
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

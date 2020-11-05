<template>
  <div>
    <div>
      <div class="card-title">'{{ getsearchText }}'(으)로 검색한 결과입니다.</div>
      <!-- <div class="card-title">'{{ this.searchText }}'(으)로 검색한 결과입니다.</div> -->
      <!-- <SearchChannel></SearchChannel> -->
      <div class="card-title"></div>
      <!-- <SearchVideo></SearchVideo> -->
    </div>
  </div>
</template>

<script>
// import SearchVideo from '@/components/SearchVideo.vue'
// import SearchChannel from '@/components/SearchChannel.vue'
import { mapGetters } from 'vuex'
const searchStore = 'searchStore'
export default {
  name: 'Search',
  components: {
    // SearchVideo,
    // SearchChannel
  },
  data: () => ({
    text: ''
  }),
  created() {},
  mounted() {},
  computed: {
    ...mapGetters(searchStore, ['getsearchText'])
  }
  // computed: {
  //   ...mapState(searchStore, ['searchText'])
  // }
}
</script>

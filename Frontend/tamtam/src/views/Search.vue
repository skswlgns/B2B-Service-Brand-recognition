<template>
  <div>
    <div>
      <div class="card-title">'{{ this.text }}'(으)로 검색한 결과입니다.</div>
      <SearchChannel></SearchChannel>
      <div class="card-title"></div>
      <SearchVideo></SearchVideo>
    </div>
  </div>
</template>

<script>
import SearchVideo from '@/components/SearchVideo.vue'
import SearchChannel from '@/components/SearchChannel.vue'
import { mapGetters } from 'vuex'
const searchStore = 'searchStore'
export default {
  name: 'Search',
  components: {
    SearchVideo,
    SearchChannel
  },
  data: () => ({
    text: ''
  }),
  created() {
    this.text = this.getsearchText()
  },
  mounted() {},
  methods: {
    ...mapGetters(searchStore, ['getsearchText'])
  },
  computed: {}
}
</script>

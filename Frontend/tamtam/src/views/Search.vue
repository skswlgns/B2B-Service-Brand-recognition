<template>
  <div>
    <div>
      <div class="card-title">'{{ this.text }}'(으)로 검색한 결과입니다.</div>
      <SearchChannel class="component"></SearchChannel>
      <SearchVideo class="component"></SearchVideo>
    </div>
  </div>
</template>

<script>
import SearchVideo from '@/components/SearchVideo.vue'
import SearchChannel from '@/components/SearchChannel.vue'
import { mapActions, mapGetters } from 'vuex'
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
    this.getSearch(this.text)
  },
  mounted() {},
  methods: {
    ...mapGetters(searchStore, ['getsearchText']),
    ...mapActions(searchStore, ['getSearch'])
  },
  computed: {}
}
</script>
<style scoped>
.component {
  margin-top: 8px;
}
</style>

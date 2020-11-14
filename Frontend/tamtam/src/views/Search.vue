<template>
  <div>
    <div>
      <div class="card-title">'{{ this.text }}'(으)로 검색한 결과입니다.</div>
      <div class="chart-title">채널</div>
      <div class="card ">
        <SearchChannel />
      </div>
      <div class="chart-title">영상</div>
      <div class="card ">
        <SearchVideo />
      </div>
    </div>
  </div>
</template>

<script>
import SearchVideo from '@/components/SearchComponents/SearchVideo.vue'
import SearchChannel from '@/components/SearchComponents/SearchChannel.vue'
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
<style lang="scss" scoped>
@import '@/scss/myAnalysis.scss';
@import '@/scss/charts.scss';
</style>

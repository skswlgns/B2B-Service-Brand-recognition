<template>
  <div class="card" v-if="len === 0">
    <div class="out">
      <div class="in">
        <i class="fa fa-exclamation-triangle fa-3x" aria-hidden="true"></i>
        <div class="out">관련 영상이 없습니다.</div>
      </div>
    </div>
  </div>
  <div v-else class="card">
    <v-row no-gutters>
      <v-col class="pa-2" v-for="i in len" :key="i" cols="12" sm="3">
        <v-card class="data" outlined tile v-if="CompanyRecommendVideo[i - 1]">
          <a @click="moveVideoDetail(CompanyRecommendVideo[i - 1].video.video_youtube_id)">
            <v-img alt="user" :src="CompanyRecommendVideo[i - 1].video.video_thumbnails" />
          </a>
          <v-card-actions>
            <h2
              style="padding: 5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;"
              v-html="CompanyRecommendVideo[i - 1].video.video_title"
            ></h2>
          </v-card-actions>
          <v-expand-transition>
            <v-card-text>
              브랜드 노출 영상 퍼센트
            </v-card-text>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import router from '@/router'
const searchStore = 'searchStore'
export default {
  data: () => ({
    len: null
  }),
  async created() {
    await this.getCompanyRecommendVideo()
    this.len = this.CompanyRecommendVideo.length
  },
  computed: {
    ...mapState(searchStore, ['CompanyRecommendVideo'])
  },
  methods: {
    ...mapActions(searchStore, ['getCompanyRecommendVideo']),
    moveVideoDetail(id) {
      router.push({ name: 'VideoDetail', params: { video_youtube_id: id } })
    }
  }
}
</script>

<style scoped>
.data {
  /* opacity: 0.7; */
  transition: all 0.6s;
  top: 0;
}
.data:hover {
  top: -10px;
  /* opacity: 1; */
}
</style>
<style lang="scss" scoped>
@import '@/scss/myAnalysis.scss';
@import '@/scss/charts.scss';
</style>

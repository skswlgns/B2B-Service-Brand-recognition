<template>
  <div>
    <v-row>
      <!-- 타임라인 파트 -->
      <v-card elevation="2">
        <h2>타임라인 파트</h2>
        <div>{{ this.videoData }}</div>
      </v-card>
    </v-row>

    <v-row>
      <v-col cols="8">
        <!-- 비디오 파트 -->
        <v-card elevation="2">
          <h2>비티오 파트</h2>
          <iframe class="youtube-iframe" :src="this.videoData.video_url" frameborder="0"></iframe>
        </v-card>
      </v-col>
      <v-col cols="4">
        <!-- 추천 동영상 파트 -->
        <v-card elevation="2">
          <h2>추천 동영상 파트</h2>
          <div>{{ this.videoData }}</div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import axios from 'axios'
import { mapMutations, mapState } from 'vuex'
const videoDetailStore = 'videoDetailStore'
// const SERVER_URL = process.env.SERVER_URL

export default {
  name: 'VideoDetail',
  data() {
    return {}
  },
  mounted() {
    // this.$store.commit('getVideoData', this.$route.params.video_youtube_id)
    this.getVideoData(this.$route.params.video_youtube_id)
  },
  computed: {
    ...mapState(videoDetailStore, ['videoData'])
  },
  methods: {
    ...mapMutations(videoDetailStore, ['getVideoData'])
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/videodetail.scss';
@import '../scss/reset.scss';
</style>

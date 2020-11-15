<template>
  <div>
    <header>추천 동영상</header>
    <v-divider />
    <div
      v-for="(recommendVideo, index) in recommendVideos"
      :key="index"
      class="recommend-list"
      @click="moveVideoDetailPage(recommendVideo.video_youtube_id)"
    >
      <img class="recommend-thumbnail" :src="recommendVideo.video_thumbnails" alt="video_thumbnail" />
      <div class="recommend-info">
        <p class="info-title">{{ recommendVideo.video_title }}</p>
        <p class="info-channel">{{ recommendVideo.channel_id }}</p>
        <p class="info-view-count">조회수 {{ viewCnt(recommendVideo.video_views) }}</p>
        <p class="info-date">{{ recommendVideo.video_date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import router from '@/router'

export default {
  name: 'RecommendVideoList',
  data() {
    return {}
  },
  computed: {
    ...mapState('videoDetailStore', ['recommendVideos'])
  },
  methods: {
    ...mapActions('videoDetailStore', ['getRecommendVideoData']),

    // 다른 동영상 페이지로 이동하기
    moveVideoDetailPage: function(videoYoutubeId) {
      router.push({ name: 'VideoDetail', params: { video_youtube_id: videoYoutubeId } })
    },

    viewCnt(count) {
      if (count < 1000) return count + '회'
      else if (count < 10000) {
        count = parseInt(count / 1000)
        return count + '천회'
      } else {
        count = parseInt(count / 10000)
        return count + '만회'
      }
    }
  },
  async created() {
    // videoData 불러오기
    await this.getRecommendVideoData()
  }
}
</script>

<style lang="scss" scoped>
// @import '@/scss/VideoDetail/video_detail.scss';
@import '@/scss/VideoDetail/recommend_section.scss';
@import '@/scss/common.scss';
</style>

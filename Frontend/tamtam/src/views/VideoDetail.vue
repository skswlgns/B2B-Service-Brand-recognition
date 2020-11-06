<template>
  <section class="grid-container">
    <!-- 타임라인 파트 -->
    <article class="card timeline-card dump">
      <header>타임라인 파트</header>
      <!-- <div class="dump">{{ this.player }}</div> -->
      <ul>
        <li v-for="company in this.videoData.video_record" :key="company._id">
          {{ company.company_id.company_nickname }}
          <ul>
            <li v-for="(record, record_index) in company.timelines" :key="record_index">
              {{ record }}
              <v-btn color="primary" small @click="playerSeekTo(record[1] / 100)">이동하기</v-btn>
            </li>
          </ul>
        </li>
      </ul>
    </article>

    <!-- 비디오 파트 -->
    <article class="card video-card">
      <div id="yt-player"></div>
      <!-- <vytia-player ytid="rr7MHqti8HM" ref="yt" @ready="onPlayerReady"></vytia-player> -->
    </article>
    <!-- 추천 동영상 파트 -->
    <article class="card recommend-video-card">
      <header>추천 동영상 파트</header>
    </article>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const videoDetailStore = 'videoDetailStore'

export default {
  name: 'VideoDetail',
  components: {
    // MyPlayer: Player
  },
  data() {
    return {
      player: {}
    }
  },
  async mounted() {
    await this.getVideoData(this.$route.params.video_youtube_id)

    // Load the IFrame Player API code asynchronously.
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

    window.onYouTubeIframeAPIReady = () => {
      this.player = new window.YT.Player('yt-player', {
        height: '360',
        width: '640',
        videoId: this.videoData.video_youtube_id,
        events: {
          onReady: window.onPlayerReady
        }
      })
      console.log('this.player', this.player)
    }

    window.onPlayerReady = event => {
      console.log('onPlayerReady')
      event.target.playVideo()
      console.log('event.target.playVideo()')
    }
  },
  computed: {
    ...mapState(videoDetailStore, ['videoData'])
  },
  methods: {
    ...mapActions(videoDetailStore, ['getVideoData']),

    // 동영상 시간 이동하기
    playerSeekTo: function(seconds) {
      this.player.seekTo(seconds, true)
      this.player.playVideo()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/videodetail.scss';
// @import '../scss/common.scss';
</style>

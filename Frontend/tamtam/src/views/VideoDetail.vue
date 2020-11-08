<template>
  <section class="grid-container">
    <!-- 타임라인 파트 -->
    <article class="card timeline-card dump">
      <header>타임라인 파트</header>
      <div>{{ videoData }}</div>

      <!-- 타임라인바 -->
      <div></div>
      <!-- 타임라인 -->
      <br />
      <hr />
      <ul v-for="company in videoData.video_record" :key="company._id">
        <li>
          {{ company.company_id.company_nickname }}
          <ul v-for="(record, record_index) in company.timelines" :key="record_index">
            <div v-if="focusedCompany == null">
              <li>
                {{ record }}
                <v-btn color="primary" small @click="playerSeekTo(record[1] / 1000)">이동하기</v-btn>
              </li>
            </div>
            <div v-else>
              <li v-if="focusedCompany === company.company_id.company_nickname">
                {{ record }}
                <v-btn color="primary" small @click="playerSeekTo(record[1] / 1000)">이동하기</v-btn>
              </li>
            </div>
          </ul>
          <br />
          <hr />
        </li>
      </ul>

      <!-- 브랜드 선택 버튼 -->
      <br />
      <hr />
      <ul>
        <li v-for="company in videoData.video_record" :key="company._id">
          <v-btn color="primary" small @click="choiceCompany(company.company_id.company_nickname)">
            {{ company.company_id.company_nickname }}
          </v-btn>
        </li>
      </ul>
    </article>

    <!-- 비디오 파트 -->
    <article class="card video-card">
      <v-btn color="primary" small @click="videoPlay()">재생하기</v-btn>
      <div id="yt-player"></div>
      <p>video_title: {{ videoData.video_title }}</p>
      <p>video_views: {{ videoData.video_views }}</p>
      <p>video_like: {{ videoData.video_like }}</p>
      <p>video_dislike: {{ videoData.video_dislike }}</p>
      <p>video_date: {{ videoData.video_date }}</p>
      <p>video_time: {{ videoData.video_time }}</p>
      <p>video_content: {{ videoData.video_content }}</p>
      <p>_id: {{ videoData._id }}</p>
      <p>video_youtube_id: {{ videoData.video_youtube_id }}</p>
      <p>channel_id: {{ videoData.channel_id }}</p>
      <p>video_url: {{ videoData.video_url }}</p>
      <p>video_thumbnails: {{ videoData.video_thumbnails }}</p>
      <p>exception_company_id: {{ videoData.exception_company_id }}</p>
      <p>scrap_company_id: {{ videoData.scrap_company_id }}</p>
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
  data() {
    return {
      player: {},
      focusedCompany: null
    }
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  async mounted() {
    console.log('mounted')

    await this.getVideoData(this.$route.params.video_youtube_id)

    // Load the IFrame Player API code asynchronously.
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

    window.onYouTubeIframeAPIReady = () => {
      this.player = new window.YT.Player('yt-player', {
        videoId: this.videoData.video_youtube_id,
        playerVars: { controls: 1, modestbranding: 1 },
        events: {
          onReady: window.onPlayerReady
        }
      })
      console.log('this.player', this.player)
    }

    window.onPlayerReady = event => {
      console.log('onPlayerReady')
      // event.target.playVideo()
      console.log('event.target.playVideo()')
      // this.player.playVideo()
      // this.player.unMute()
      // this.playerSeekTo(20)
    }
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },
  beforeDestroy() {
    console.log('beforeDestroy')
  },
  destroyed() {
    console.log('destroyed')
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
    },

    // 동영상 재생하기
    videoPlay: function() {
      this.player.playVideo()
    },

    // 해당 브랜드 선택하여 타임라인 자세히보기 & 취소하기
    // 추천동영상 리스트도 변경하는 로직 필요
    choiceCompany: function(company) {
      console.log('choiceCompany')
      console.log(company)

      if (this.focusedCompany === company) {
        this.focusedCompany = null
      } else {
        this.focusedCompany = company
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/videodetail.scss';
@import '../scss/common.scss';
</style>

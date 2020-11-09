<template>
  <section class="grid-container">
    <!-- Timeline Card -->
    <article class="card timeline-card">
      <!-- Timeline background bar -->
      <div class="timeline-section">
        <div class="timeline-background-bar"></div>

        <!-- Timeline Records -->
        <div v-for="(company, company_index) in videoData.video_record" :key="company._id">
          <ul v-for="(record, record_index) in company.timelines" :key="record_index">
            <div v-show="!focusedCompany || focusedCompany === company.company_id.company_nickname">
              <li
                :id="'record-' + company_index + '-' + record_index"
                :class="`timeline-record background-` + company_index"
                @click="playerSeekTo(record[1])"
              ></li>
            </div>
          </ul>
        </div>
      </div>

      <!-- Timestamp -->
      <div class="timestamp-section">
        <span>00:00</span>
        <span>00:00</span>
      </div>

      <!-- Company Toggle -->
      <div class="company-toggle-section">
        <div
          :id="'company-button-' + company_index"
          class="company-button"
          v-for="(company, company_index) in videoData.video_record"
          :key="company._id"
          @click="choiceCompany(company_index, company.company_id.company_nickname)"
        >
          {{ company.company_id.company_nickname }}
        </div>
      </div>
    </article>

    <!-- Video Card -->
    <article class="card video-card">
      <div id="yt-player"></div>
      <p>video_title: {{ videoData.video_title }}</p>
      <p>video_views: {{ videoData.video_views }}</p>
      <p>video_like: {{ videoData.video_like }}</p>
      <p>video_dislike: {{ videoData.video_dislike }}</p>
      <p>video_date: {{ videoData.video_date }}</p>
      <p>video_time: {{ videoData.video_time }}</p>
      <p>video_content: {{ videoData.video_content }}</p>
      <p>video_category: {{ videoData.video_category }}</p>
      <p>_id: {{ videoData._id }}</p>
      <p>video_youtube_id: {{ videoData.video_youtube_id }}</p>
      <p>channel_id: {{ videoData.channel_id }}</p>
      <p>video_url: {{ videoData.video_url }}</p>
      <p>video_thumbnails: {{ videoData.video_thumbnails }}</p>
      <p>exception_company_id: {{ videoData.exception_company_id }}</p>
      <p>scrap_company_id: {{ videoData.scrap_company_id }}</p>
    </article>

    <!-- Recommandation Card -->
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
      focusedCompany: false
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

    // youtube iframe 만들기
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
      // console.log('this.player', this.player)
    }

    window.onPlayerReady = event => {
      event.target.playVideo()
      // console.log('onPlayerReady')
      // console.log('event.target.playVideo()')
      // this.player.playVideo()
      // this.player.unMute()
      // this.playerSeekTo(20)
    }

    // 각 company-record style, hover 적용해주기
    const videoDuration = this.videoData.video_time
    this.videoData.video_record.forEach((company, companyIndex) => {
      company.timelines.forEach((record, recordIndex) => {
        const recordElement = document.getElementById(`record-${companyIndex}-${recordIndex}`)
        if (recordElement) {
          recordElement.style.width = `${((record[2] - record[1]) / videoDuration) * 100}%`
          recordElement.style.left = `${(record[1] / videoDuration) * 100}%`
          // recordElement.style.left = `30px`
        }
      })
    })
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
    choiceCompany: function(companyIndex, company) {
      if (this.focusedCompany === company) {
        this.focusedCompany = false
        document.getElementById(`company-button-${companyIndex}`).className = `company-button`
      } else {
        // 선택한 company 이외에 toggle이 되어있는 경우 모두 style 해제
        for (let i = 0; i < this.videoData.video_record.length; i++) {
          document.getElementById(`company-button-${i}`).className = `company-button`
        }
        this.focusedCompany = company
        document.getElementById(
          `company-button-${companyIndex}`
        ).className = `toggle-selected company-button background-${companyIndex}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/videodetail.scss';
@import '../scss/common.scss';
</style>

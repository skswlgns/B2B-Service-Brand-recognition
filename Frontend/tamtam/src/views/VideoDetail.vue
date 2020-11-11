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
            <div :class="{ 'display-none': focusedCompany && focusedCompany !== company.company_id.company_nickname }">
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
        <span>00:00 변경 필요</span>
      </div>

      <!-- Company Toggle -->
      <div class="company-toggle-section">
        <div
          :id="'company-button-' + company_index"
          :class="`company-button toggle-unselected selected-` + company_index"
          v-for="(company, company_index) in videoData.video_record"
          :key="company._id"
          @click="choiceCompany(company_index, company.company_id.company_nickname)"
        >
          <span>{{ company_index + 1 }}. {{ company.company_id.company_name }}</span>
          <span>수정필요 30%</span>
        </div>
      </div>
    </article>

    <!-- Video Card -->
    <article class="card video-card">
      <div id="yt-player-serction" class="video-player-section"></div>
      <div class="video-info-section">
        <p>{{ videoData.video_category }}</p>
        <p class="video-title">{{ videoData.video_title }}</p>
        <span class="video-small">조회수 {{ videoData.video_views }}회</span>
        <span class="video-small">{{ videoData.video_date }}</span>
        <span class="video-small">좋아요: {{ videoData.video_like }}</span>
        <span class="video-small">싫어요: {{ videoData.video_dislike }}</span>
        <a :href="videoData.video_url">유튜브로 보러가기</a>
        <v-btn>동영상 스크랩하기</v-btn>
        <v-btn>해당 동영상 통계에서 제외하기</v-btn>
        <p>{{ videoData.video_content }}</p>
      </div>
    </article>

    <!-- Recommandation Card -->
    <article class="card recommend-video-card">
      <header>추천 동영상 파트</header>
      <hr />
      <div
        class="recommend-list"
        v-for="(recommendVideo, index) in recommendVideos"
        :key="index"
        @click="moveVideoDetailPage(recommendVideo.video_youtube_id)"
      >
        <img class="recommend-thumbnail" :src="recommendVideo.video_thumbnails" alt="video_thumbnail" />
        <div class="recommend-info">
          <p>{{ recommendVideo.video_title }}</p>
          <p>{{ recommendVideo.channel_id }}</p>
          <p>조회수 {{ recommendVideo.video_views }}회</p>
          <p>{{ recommendVideo.video_date }}</p>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import router from '../router'

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
    // const playerSection = document.getElementById('yt-player-serction')
    // let playerElement = document.getElementById('yt-player')
    // if (playerElement) {
    //   playerElement.remove()
    // }
    // const newPlayerElement = document.createElement('div')
    // newPlayerElement.setAttribute('id', 'yt-player')
    // newPlayerElement.setAttribute('class', 'youtube-iframe')
    // playerSection.appendChild(newPlayerElement)
    // console.log(playerSection)

    const playerSection = document.getElementById('yt-player-serction')
    let playerElement = document.getElementById('yt-player')
    if (playerElement) {
      playerElement.remove()
    }
    const newPlayerElement = document.createElement('div')
    newPlayerElement.setAttribute('id', 'yt-player')
    newPlayerElement.setAttribute('class', 'youtube-iframe')
    playerSection.appendChild(newPlayerElement)
    playerElement = document.getElementById('yt-player')
    console.log(playerSection)

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

    console.log(!this.player)
    window.onYouTubeIframeAPIReady = () => {
      this.player = new window.YT.Player('yt-player', {
        videoId: this.videoData.video_youtube_id,
        playerVars: { controls: 1, modestbranding: 1 },
        events: {
          onReady: window.onPlayerReady
        }
      })
      console.log(this.player)
    }

    if (!this.player) {
      this.player = new window.YT.Player('yt-player', {
        videoId: this.videoData.video_youtube_id,
        playerVars: { controls: 1, modestbranding: 1 },
        events: {
          onReady: window.onPlayerReady
        }
      })
      console.log(this.player)
    }

    // 자동재생 설정
    window.onPlayerReady = event => {
      event.target.playVideo()
    }

    // youtube iframe CSS 적용하기
    playerElement.style.position = 'absolute'
    playerElement.style.width = '100%'
    playerElement.style.height = '100%'
    playerElement.style.borderRadius = '8px 8px 0 0'

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
    ...mapState(videoDetailStore, ['videoData', 'recommendVideos'])
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

    // 다른 동영상 페이지로 이동하기
    moveVideoDetailPage: function(videoYoutubeId) {
      router.push({ name: 'VideoDetail', params: { video_youtube_id: videoYoutubeId } })
    },

    // 해당 브랜드 선택하여 타임라인 자세히보기 & 취소하기
    // 추천동영상 리스트도 변경하는 로직 필요
    choiceCompany: function(companyIndex, company) {
      if (this.focusedCompany === company) {
        // 선택된 company 선택 해제
        this.focusedCompany = false
        document.getElementById(
          `company-button-${companyIndex}`
        ).className = `company-button toggle-unselected selected-${companyIndex}`
      } else {
        // 선택한 company 이외에 toggle이 되어있는 경우 모두 style 해제
        for (let i = 0; i < this.videoData.video_record.length; i++) {
          document.getElementById(`company-button-${i}`).className = `company-button toggle-unselected selected-${i}`
        }
        // 선택한 company 스타일 적용
        this.focusedCompany = company
        document.getElementById(
          `company-button-${companyIndex}`
        ).className = `company-button toggle-selected background-${companyIndex}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/videodetail.scss';
@import '../scss/common.scss';
</style>

<template>
  <div class="card" v-if="video.length === 0">
    <div class="out">
      <div class="in">
        <i class="fa fa-exclamation-triangle fa-3x" aria-hidden="true"></i>
        <div class="out">스크랩한 영상이 없습니다.</div>
      </div>
    </div>
  </div>
  <div v-else class="card">
    <div style="height:48px;">
      <div style="float:left;" class="pa-3">
        스크랩한 영상
      </div>
    </div>
    <v-row no-gutters>
      <v-col class="pa-2" v-for="i in len" :key="i" cols="12" sm="4">
        <!-- <v-card class="mx-auto">
          <v-img :src="video[i - 1].video_thumbnails" />
          <v-card-title v-if="video.video_title.length > 25">
            {{ video.video_title.slice(0, 25) }}
          </v-card-title>
          <v-card-title v-else>
            {{ video.video_title }}
          </v-card-title>
          <div v-if="video.video_views < 1000" class="views">조회수 : {{ video.video_views }}회</div>
          <div v-else-if="video.video_views < 10000" class="views">
            조회수 : {{ parseInt(video.video_views / 1000) }}천회
          </div>
          <div v-else class="views">조회수 : {{ parseInt(video.video_views / 10000) }}만회</div>
          <v-card-text>
            <canvas :id="video._id" />
          </v-card-text>
          <v-spacer />
        </v-card> -->
        <v-card class="mx-auto data" outlined tile v-if="video[i - 1]">
          <a @click="moveVideoDetail(video[i - 1].video_youtube_id)">
            <v-img alt="user" :src="video[i - 1].video_thumbnails" />
          </a>
          <v-card-title>
            <h2
              style="padding: 5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;"
              v-html="video[i - 1].video_title"
            ></h2>
          </v-card-title>
          <div v-if="video[i - 1].video_views < 1000" class="views">조회수 : {{ video[i - 1].video_views }}회</div>
          <div v-else-if="video[i - 1].video_views < 10000" class="views">
            조회수 : {{ parseInt(video[i - 1].video_views / 1000) }}천회
          </div>
          <div v-else class="views">조회수 : {{ parseInt(video[i - 1].video_views / 10000) }}만회</div>
          <!-- <v-expand-transition>
            <v-card-text>
              브랜드 노출 영상 퍼센트
            </v-card-text>
          </v-expand-transition> -->
          <v-card-text>
            <canvas :id="video[i - 1]._id" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div v-if="this.video.length > 3" style="height:48px;">
      <div style="float:left;" class="pa-3"></div>
      <div align="right" class="pa-3">
        <div @click="moredata()" class="cursor">
          더 보기
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import router from '@/router'
import Chart from 'chart.js'
const searchStore = 'searchStore'
// const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL
export default {
  data: () => ({
    len: 3,
    chartData: {
      type: 'doughnut',
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: []
          }
        ]
      },
      options: {
        responsive: true,
        legend: { position: 'right' },
        maintainAspectRatio: false,
        animation: false,
        pieceLabel: { mode: 'value', position: 'inside', fontSize: 11, fontStyle: 'bold' }
      }
    }
  }),
  async created() {
    await this.getScrapVideo()
    // for (let k = 0; k < this.video.length; k++) {
    //   this.video[k].chartData = this.chartData
    //   this.video[k].chart = this.video[k].channel_id
    // }
    // console.log(this.video)
    // if (response.data.length) {
    //   this.videoData = this.videoData.concat(response.data)
    //   $state.loaded()
    //   this.config.headers.limit += 4

    // for (let i = 0; i < this.video.length; i++) {
    //   for (let j = 0; j < this.video[i].video_record.length; j++) {
    //     this.video[i].chartData.data.datasets[0].data.push(
    //       (this.video[i].video_record[j].total_exposure_time / this.video[i].video_total) * 100
    //     )
    //     this.video[i].chartData.data.datasets[0].backgroundColor.push(this.dynamicColors())
    //     this.video[i].chartData.data.labels.push(this.video[i].video_record[j].company_id.company_nickname)
    //   }
    // }

    //   if (this.videoData.length / 4 === 0) {
    //     $state.complete()
    //   }
    // } else {
    //   $state.complete()
    // }
  },
  updated() {
    // for (let i = 0; i < this.video.length; i++) {
    //   console.log(this.video[i])
    //   this.createChart(this.video[i].chart, this.video[i].chartData)
    // }
  },
  computed: {
    ...mapState(searchStore, ['video'])
  },
  methods: {
    ...mapActions(searchStore, ['getScrapVideo']),
    moredata() {
      this.len = this.video.length
    },
    moveVideoDetail(id) {
      router.push({ name: 'VideoDetail', params: { video_youtube_id: id } })
    },
    createChart(charId, chartData) {
      const ctx = document.getElementById(charId)
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
      return myChart
    },
    dynamicColors() {
      const r = Math.floor(Math.random() * 255)
      const g = Math.floor(Math.random() * 255)
      const b = Math.floor(Math.random() * 255)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
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
@import '@/scss/channel.scss';
</style>

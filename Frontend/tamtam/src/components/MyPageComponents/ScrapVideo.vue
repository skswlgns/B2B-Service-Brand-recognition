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
    <v-row no-gutters>
      <v-col class="pa-2" v-for="i in len" :key="i" cols="12" sm="4">
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
          <div>조회수 {{ wathchCnt(video[i - 1].video_views) }}</div>
          <v-expand-transition>
            <v-card-text>
              <canvas :id="video[i - 1]._id" />
            </v-card-text>
          </v-expand-transition>
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
const _ = require('lodash')
const searchStore = 'searchStore'
// const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL
export default {
  data: () => ({
    len: null,
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
        legend: {
          position: 'bottom',
          align: 'center',
          labels: {
            boxWidth: 3,
            padding: 25,
            rtl: true
          }
        },
        maintainAspectRatio: false,
        animation: false,
        pieceLabel: { mode: 'value', position: 'inside', fontSize: 11, fontStyle: 'bold' },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data.labels[tooltipItem.index] + ': ' + data.datasets[0].data[tooltipItem.index] + '%'
            }
          }
        }
      }
    }
  }),
  async created() {
    await this.getScrapVideo()
    console.log(this.video)
    this.len = this.video.length
    for (let i = 0; i < this.len; i++) {
      this.video[i].chartData = _.cloneDeep(this.chartData)
      this.video[i].chart = this.video[i]._id
    }
    for (let i = 0; i < this.len; i++) {
      for (let j = 0; j < this.video[i].video_record.length; j++) {
        this.video[i].chartData.data.datasets[0].data.push(
          Math.round((this.video[i].video_record[j].total_exposure_time / this.video[i].video_total) * 100)
        )
        this.video[i].chartData.data.datasets[0].backgroundColor.push(this.dynamicColors())
        this.video[i].chartData.data.labels.push(this.video[i].video_record[j].company_id.company_nickname)
      }
    }
  },
  computed: {
    ...mapState(searchStore, ['video'])
  },
  updated() {
    for (let i = 0; i < this.len; i++) {
      this.createChart(this.video[i].chart, this.video[i].chartData)
    }
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
    },
    wathchCnt(count) {
      if (count < 1000) return count + '회'
      else if (count < 10000) {
        count = parseInt(count / 1000)
        return count + '천회'
      } else {
        count = parseInt(count / 10000)
        return count + '만회'
      }
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

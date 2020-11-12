<template>
  <div>
    <v-row>
      <v-col v-for="(video, i) in videoData" :key="i" cols="3">
        {{ video.video_record }}
        <v-card class="mx-auto">
          <v-img :src="video.video_thumbnails" />
          <v-card-title v-if="video.video_title.length > 25">{{ video.video_title.slice(0, 25) }}</v-card-title>
          <v-card-title v-else>{{ video.video_title }}</v-card-title>
          <div class="views" v-if="video.video_views < 1000">조회수 : {{ video.video_views }}회</div>
          <div class="views" v-else-if="video.video_views < 10000">
            조회수 : {{ parseInt(video.video_views / 1000) }}천회
          </div>
          <div class="views" v-else>조회수 : {{ parseInt(video.video_views / 10000) }}만회</div>
          <v-card-text>
            <canvas></canvas>
          </v-card-text>
          <v-spacer></v-spacer>
        </v-card>
      </v-col>
    </v-row>
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import axios from 'axios'
import cookies from 'vue-cookies'
import Chart from 'chart.js'

const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL

export default {
  name: 'Video',
  data() {
    return {
      config: {
        headers: {
          token: cookies.get('token'),
          limit: 0
        }
      },
      videoData: [],
      Id: cookies.get('channelId'),
      Circle: {
        type: 'doughnut',
        data: {
          labels: ['삼성', 'LG', '애플', 'Sony', 'Philips'],
          datasets: [
            {
              data: [70, 8, 4, 8, 10],
              backgroundColor: [
                this.dynamicColors(),
                this.dynamicColors(),
                this.dynamicColors(),
                this.dynamicColors(),
                this.dynamicColors()
              ]
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
      },
      chart: null
    }
  },
  components: {
    InfiniteLoading
  },
  methods: {
    infiniteHandler($state) {
      axios
        .get(`${API_SERVER_URL}/video/videos/${this.Id}`, this.config)
        .then(response => {
          setTimeout(() => {
            if (response.data.length) {
              this.videoData = this.videoData.concat(response.data)
              $state.loaded()
              this.config.headers.limit += 4
              for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].video_record) {
                  console.log(response.data[i].video_record)
                  for (let j = 0; j < response.data[i].video_record.length; j++) {
                    console.log(response.data[i].video_record[i].total_exposure_time)
                    // for (let k = 0; k < response.data[i].video_record[i].total_exposure_time.length; k++) {
                    //   console.log()
                    // }
                  }
                }
              }
              if (this.videoData.length / 4 === 0) {
                $state.complete()
              }
            } else {
              $state.complete()
            }
          }, 500)
        })
        .catch(error => {
          console.log(error)
        })
    },
    createChart(charId, chartData) {
      const ctx = document.getElementById(charId)
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
      return myChart
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
@import '../scss/channel.scss';
</style>

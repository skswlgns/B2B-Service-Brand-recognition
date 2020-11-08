<template>
  <div class="card">
    <v-card flat tile style="padding:8px;">
      <v-carousel hide-delimiters height="100%">
        <v-carousel-item light v-for="i in len" :key="i">
          <v-row>
            <v-col v-for="j in 3" :key="j" sm="4">
              <!-- <p v-html="'chart' + ((i - 1) * 3 + (j - 1))"></p> -->
              <v-card tile flat class="data" v-if="videos[(i - 1) * 3 + (j - 1)]">
                <v-img alt="user" :src="videos[(i - 1) * 3 + (j - 1)].snippet.thumbnails.medium.url" />
                <v-card-actions>
                  <h2
                    style="padding: 5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;"
                    v-html="videos[(i - 1) * 3 + (j - 1)].snippet.title"
                  ></h2>
                  <v-spacer></v-spacer>

                  <v-btn icon @click="show = !show">
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                </v-card-actions>

                <v-expand-transition>
                  <div v-show="show">
                    <p v-html="tube[(i - 1) * 3 + (j - 1)]"></p>
                    <v-card-text>
                      <canvas :id="tube[(i - 1) * 3 + (j - 1)]"></canvas>
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
import Chart from 'chart.js'

export default {
  data: () => ({
    videos: [],
    len: 0,
    title: '',
    show: false,
    tube: ['chart0', 'chart1', 'chart2', 'chart3', 'chart4', 'chart5'],
    youtube: [
      {
        Circle: {
          type: 'doughnut',
          data: {
            labels: ['삼성', 'LG', '애플', 'Sony', 'Philips'],
            datasets: [
              {
                data: [70, 8, 4, 8, 10]
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
        chart: 'chart0'
      }
    ]
  }),
  created() {
    this.title = '싸피'
    this.init()
  },
  mounted() {
    // alert(this.len)
    console.log(document.getElementById(this.tube[0]))
    // console.log('hi')
    // console.log(document.getElementById('chart0'))
    // console.log(this.youtube[0].Circle)
    // this.createChart()
  },
  methods: {
    createChart(chartData) {
      const ctx = this.$refs.chart
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
      return myChart
    },
    init() {
      // 백엔드 연결
      // const url = 'http://localhost:3000/api/video/5f9e7736c24b5734cc5fe5e1';
      const url =
        'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBOoucBKPmX2PzsuBbhyIxaQki54e4Fh_g&part=snippet&regionCode=KR&maxResults=6&type=video&q=' +
        this.title
      axios.get(url).then(res => {
        this.videos = res.data.items
        this.len = parseInt(this.videos.length / 3)
        if (this.videos.length % 3 !== 0) {
          this.len += 1
        }
        // console.log(this.videos.length)
      })
    }
  }
}
</script>

<style scoped>
.data {
  /* the other rules */
  transition: all 0.6s;
}
.data:hover {
  transform: scale(1.1);
}
</style>

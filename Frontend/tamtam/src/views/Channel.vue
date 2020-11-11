<template>
  <div class="fr">
    {{ channelData }}
    <div class="fr-profile">
      <div class="card">
        <div class="channel-header-container">
          <div class="img-fr">
            <img :src="channelData.channel_img" />
          </div>
          <div class="inner-header-container">
            <div class="meta">
              <div class="name">{{ channelData.channel_name }}</div>
              <div class="subscriber" v-if="channelData.channel_subscribe < 1000">구독자: {{ sliceViews }}명</div>
              <div class="subscriber" v-else-if="channelData.channel_subscribe < 10000">
                구독자: {{ sliceViews }}만명
              </div>
              <div class="subscriber" v-else>구독자: {{ sliceViews }}만명</div>
            </div>
            <v-btn color="#916bf6">광고 문의</v-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-fr">
      <div class="card mr-2">
        <canvas id="wChart"></canvas>
      </div>
      <div class="card ml-2">
        <div class="toggle">
          <span @click="change('subscribe')">구독자수</span>
          <span @click="change('views')">일일 조회수</span>
        </div>
        <canvas id="subscribe-line" v-if="isActive === 'subscribe'"></canvas>
        <canvas id="views-line" v-if="isActive === 'views'"></canvas>
      </div>
    </div>
    <div class="fr-youtube">
      <Video :channelId="channelData.channel_youtube_id" />
      <!-- <div v-for="(item, $index) in list" :key="$index">
        {{ $index }}: {{ item.title }}
        <hr />
      </div> -->
      <!-- <infinite-loading class="" @infinite="infiniteHandler"></infinite-loading> -->
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
import { mapState, mapGetters, mapActions } from 'vuex'

// import axios from 'axios'
// import cookies from 'vue-cookies'
import Video from '../components/Video.vue'

// const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL
// const config = {
//   headers: {
//     token: cookies.get('token')
//   }
// }

// const api = 'http://hn.algolia.com/api/v1/search_by_date?tags=story'

const channelStore = 'channelStore'

export default {
  name: 'Channel',
  components: {
    Video
  },
  data() {
    return {
      limit: 0,
      wholeData: {
        type: 'horizontalBar',
        data: {
          labels: ['도희', '승범', '용욱', '다인', '지훈'],
          datasets: [
            {
              label: '# of Votes',
              data: [12, 19, 3, 5, 4],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      },
      subData: {
        type: 'line',
        data: {
          labels: ['도희', '승범', '용욱', '다인', '지훈'],
          datasets: [
            {
              label: '# of Votes',
              data: [12, 19, 3, 5, 4],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
              ],
              borderWidth: 1
            }
          ]
        },
        options: {}
      },
      viewsData: {
        type: 'line',
        data: {
          labels: ['도희', '승범', '용욱', '다인', '지훈'],
          datasets: [
            {
              label: '# of Votes',
              data: [10, 15, 20, 25, 30],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
              ],
              borderWidth: 1
            }
          ]
        },
        options: {}
      }
    }
  },
  props: {
    channelId: {
      type: String
    }
  },
  methods: {
    ...mapActions(channelStore, ['change', 'getChannelData', 'getVideo']),
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
  computed: {
    ...mapState(channelStore, ['isActive', 'channelData', 'youtubeChannelId']),
    ...mapGetters(channelStore, ['sliceViews'])
  },
  created() {
    this.getChannelData(this.channelId)
  },
  mounted() {
    this.createChart('wChart', this.wholeData)
    this.createChart('subscribe-line', this.subData)
  },
  updated() {
    if (this.isActive === 'views') {
      this.createChart('views-line', this.viewsData)
    } else {
      this.createChart('subscribe-line', this.subData)
    }
    // this.youtubeChannelId = data[0].channel_youtube_id
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/channel.scss';
</style>

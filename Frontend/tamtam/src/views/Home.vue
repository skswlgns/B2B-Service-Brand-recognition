<template>
  <div class="grid-container">
    <!-- 개별카드 -->
    <article class="card all-exposure-chart-card">
      <div class="chart-title">전체 브랜드 노출 순위</div>
      <v-divider></v-divider>
      <div class="chart-body">
        <canvas id="all-exposure-chart"></canvas>
      </div>
    </article>

    <article class="card ind-exposure-chart-section">
      <div class="chart-title">업계 브랜드 노출 순위</div>
      <v-divider></v-divider>
      <div class="chart-body">
        <canvas id="ind-exposure-chart"></canvas>
      </div>
    </article>

    <!-- 카드 한번에 -->
    <!-- <article class="card exposure-charts-section">
      <div class="chart-header">
        <div class="chart-title">브랜드 노출 순위</div>
        <v-divider></v-divider>
      </div>
      <div>
        <p class="chart-subtitle">전체 브랜드 순위</p>
        <AllExposureChartCopy />
      </div>
      <div>
        <p class="chart-subtitle">IT 업계 브랜드 순위</p>
        <IndExposureChartCopy />
      </div>
    </article> -->

    <!-- Ranking Section -->
    <article class="card ranking-section">
      <div class="chart-title">채널 추천</div>
      <v-divider></v-divider>

      <div class="ranking-group">
        <div class="ranking-list">
          <div class="ranking-body">
            <div class="ranking-title">
              <div>구독자순</div>
            </div>
            <v-list-item class="ranking-item" v-for="(channel, index) in subscribeData" :key="index">
              <router-link :to="{ name: 'Channel', params: { channelId: channel._id } }">
                <img :src="channel.channel_img" />
                <div>
                  <p>{{ channel.channel_name }}</p>
                  <p>구독자 {{ channel.channel_subscribe }}명</p>
                  <p>{{ channel.channel_video_cnt }}개 영상</p>
                </div>
              </router-link>
            </v-list-item>
            <router-link to="/home">더 보기</router-link>
          </div>
        </div>
        <div class="ranking-list">
          <div class="ranking-body">
            <div class="ranking-title">
              <div>평균 조회수 순</div>
            </div>
            <v-list-item class="ranking-item" v-for="(channel, index) in viewsData" :key="index">
              <router-link :to="{ name: 'Channel', params: { channelId: channel._id } }">
                <img :src="channel.channel_img" />
                <div>
                  <p>{{ channel.channel_name }}</p>
                  <p>구독자 {{ channel.channel_subscribe }}명</p>
                  <p>{{ channel.channel_video_cnt }}개 영상</p>
                </div>
              </router-link>
            </v-list-item>
            <router-link to="/home">더 보기</router-link>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import axios from 'axios'
// import cookies from 'vue-cookies'
// import AllExposureChart from '@/components/ChartComponents/AllExposureChart.vue'
// import IndExposureChart from '@/components/ChartComponents/IndExposureChart.vue'
// import AllExposureChartCopy from '@/components/ChartComponents/AllExposureChartCopy.vue'
// import IndExposureChartCopy from '@/components/ChartComponents/IndExposureChartCopy.vue'

// const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL

export default {
  name: 'Home',
  components: {
    // AllExposureChart,
    // IndExposureChart
    // AllExposureChartCopy,
    // IndExposureChartCopy
  },
  data() {
    return {
      allExposureData: {
        type: 'line',
        data: {
          labels: ['4', '3', '2', '1'],
          datasets: [
            {
              label: 'samsung',
              data: [5, 7, 9, 12],
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              pointBackgroundColor: 'rgba(255, 99, 132, 1)'
            },
            {
              label: 'LG',
              data: [6, 5, 3, 4],
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              pointBackgroundColor: 'rgba(54, 162, 235, 1)'
            },
            {
              label: 'apple',
              data: [1, 3, 2, 1],
              borderColor: 'rgba(255, 206, 86, 1)',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              pointBackgroundColor: 'rgba(255, 206, 86, 1)'
            },
            {
              label: 'sony',
              data: [4, 2, 3, 4],
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              pointBackgroundColor: 'rgba(75, 192, 192, 1)'
            },
            {
              label: 'philips',
              data: [2, 3, 3, 2],
              borderColor: 'rgba(153, 102, 255, 1)',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              pointBackgroundColor: 'rgba(153, 102, 255, 1)'
            }
          ]
        },
        options: {
          legend: {
            position: 'right',
            align: 'center',
            labels: {
              boxWidth: 3,
              padding: 25,
              rtl: true
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false
                },
                ticks: {
                  padding: 8,
                  beginAtZero: true,
                  callback: function(value, index, values) {
                    return value + 'W'
                  }
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  padding: 8,
                  beginAtZero: true,
                  callback: function(value, index, values) {
                    return value + 's'
                  }
                }
              }
            ]
          },
          elements: {
            point: {
              radius: 5,
              hoverRadius: 7
            }
          }
        }
      },
      indExposureData: {
        type: 'line',
        data: {
          labels: ['4', '3', '2', '1'],
          datasets: [
            {
              label: 'samsung',
              data: [5, 7, 9, 12],
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              pointBackgroundColor: 'rgba(255, 99, 132, 1)'
            },
            {
              label: 'LG',
              data: [6, 5, 3, 4],
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              pointBackgroundColor: 'rgba(54, 162, 235, 1)'
            },
            {
              label: 'apple',
              data: [1, 3, 2, 1],
              borderColor: 'rgba(255, 206, 86, 1)',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              pointBackgroundColor: 'rgba(255, 206, 86, 1)'
            },
            {
              label: 'sony',
              data: [4, 2, 3, 4],
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              pointBackgroundColor: 'rgba(75, 192, 192, 1)'
            },
            {
              label: 'philips',
              data: [2, 3, 3, 2],
              borderColor: 'rgba(153, 102, 255, 1)',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              pointBackgroundColor: 'rgba(153, 102, 255, 1)'
            }
          ]
          // backgroundColor: [
          //   'rgba(255, 99, 132, 0.2)',
          //   'rgba(54, 162, 235, 0.2)',
          //   'rgba(255, 206, 86, 0.2)',
          //   'rgba(75, 192, 192, 0.2)',
          //   'rgba(153, 102, 255, 0.2)'
          // ],
          // borderColor: [
          //   'rgba(255, 99, 132, 1)',
          //   'rgba(54, 162, 235, 1)',
          //   'rgba(255, 206, 86, 1)',
          //   'rgba(75, 192, 192, 1)',
          //   'rgba(153, 102, 255, 1)'
          // ],
        },
        options: {
          legend: {
            position: 'right',
            align: 'start',
            labels: {
              boxWidth: 3,
              padding: 25
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false
                },
                ticks: {
                  padding: 8,
                  beginAtZero: true,
                  callback: function(value, index, values) {
                    return value + 'W'
                  }
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  padding: 8,
                  beginAtZero: true,
                  callback: function(value, index, values) {
                    return value + 's'
                  }
                }
              }
            ]
          },
          elements: {
            point: {
              radius: 5,
              hoverRadius: 7
            }
          }
        }
      }
    }
  },
  computed: {
    ...mapState('homeStore', ['subscribeData', 'viewsData']),
    ...mapState('chartDataStore', ['companyData'])
  },
  methods: {
    ...mapActions('homeStore', ['getChannel']),
    ...mapActions('chartDataStore', ['createChart', 'getCompanyData'])
  },
  async created() {
    console.log('home mounted')
    await this.getCompanyData()
    console.log(this.companyData)
    await this.getChannel()
    this.createChart({ chartId: 'all-exposure-chart', chartData: this.allExposureData })
    this.createChart({ chartId: 'ind-exposure-chart', chartData: this.indExposureData })
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/Home/home.scss';
@import '@/scss/charts.scss';
</style>

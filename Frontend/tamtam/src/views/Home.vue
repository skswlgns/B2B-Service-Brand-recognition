<template>
  <div class="grid-container">
    <!-- 개별카드 -->
    <article class="card all-exposure-chart-section">
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

    <article class="card recommand-section">
      <div class="chart-title">유투버 추천</div>
      <v-divider></v-divider>
      <HomeRecommand class="component" style="padding:50px;"></HomeRecommand>
    </article>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
import cookies from 'vue-cookies'
import HomeRecommand from '@/components/HomeComponents/HomeRecommand.vue'

const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL

export default {
  name: 'Home',
  components: {
    HomeRecommand
  },
  data() {
    return {
      allExposureData: {
        type: 'line',
        data: {
          labels: ['4', '3', '2', '1'],
          datasets: []
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
          datasets: []
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
                  padding: 30,
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
    // 내림차순 정렬
    this.companyData.sort((a, b) => parseFloat(b.company_four_week[3]) - parseFloat(a.company_four_week[3]))
    const colorsArray = [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)'
    ]

    // allExposureData
    const allExposureCompany = this.companyData.slice(0, 5)
    const allExposureDataset = allExposureCompany.map((company, companyIndex) => {
      return {
        label: company.company_name,
        data: company.company_four_week,
        borderColor: colorsArray[companyIndex],
        backgroundColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: colorsArray[companyIndex]
      }
    })
    this.allExposureData.data.datasets = allExposureDataset
    this.createChart({ chartId: 'all-exposure-chart', chartData: this.allExposureData })

    // indExposureData
    const config = {
      headers: {
        token: cookies.get('token'),
        company_id: cookies.get('companyId')
      }
    }
    const companyResponse = await axios.get(`${API_SERVER_URL}/company/${cookies.get('companyId')}`, config)
    const companyIndustry = companyResponse.data.company_industry
    const indExposureCompany = this.companyData
      .filter(company => company.company_industry === companyIndustry)
      .slice(0, 5)
    const indExposureDataset = indExposureCompany.map((company, companyIndex) => {
      return {
        label: company.company_name,
        data: company.company_four_week,
        borderColor: colorsArray[companyIndex],
        backgroundColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: colorsArray[companyIndex]
      }
    })
    this.indExposureData.data.datasets = indExposureDataset
    this.createChart({ chartId: 'ind-exposure-chart', chartData: this.indExposureData })

    await this.getChannel()
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/Home/home.scss';
@import '@/scss/charts.scss';
</style>

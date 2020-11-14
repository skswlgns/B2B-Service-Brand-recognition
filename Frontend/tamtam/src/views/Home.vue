<template>
  <div class="grid-container">
    <!-- All Exposure Chart Section -->
    <article class="all-exposure-chart-section">
      <div class="chart-title">전체 브랜드 노출 순위</div>
      <div class="card chart-body">
        <div class="line-chart">
          <canvas id="all-exposure-line-chart"></canvas>
        </div>
        <div class="doughnut-chart">
          <canvas id="all-exposure-doughnut-chart"></canvas>
        </div>
      </div>
    </article>

    <!-- industry Exposure Chart Section -->
    <article class="ind-exposure-chart-section">
      <div class="chart-title">업계 브랜드 노출 순위</div>
      <div class="card chart-body">
        <div class="line-chart">
          <canvas id="ind-exposure-line-chart"></canvas>
        </div>
        <div class="doughnut-chart">
          <canvas id="ind-exposure-doughnut-chart"></canvas>
        </div>
      </div>
    </article>

    <!-- Ranking Section -->
    <article class="ranking-section">
      <div class="chart-title">채널 Top 5</div>
      <div class="card ranking-group">
        <div class="ranking-list">
          <div class="ranking-title">
            <span>구독자순</span>
            <router-link to="/home">더 보기</router-link>
          </div>
          <div class="ranking-body">
            <v-list-item class="ranking-item" v-for="(channel, index) in homeSubscribeChannelRanking" :key="index">
              <router-link :to="{ name: 'Channel', params: { channelId: channel._id } }">
                <img :src="channel.channel_img" />
                <div>
                  <p>{{ channel.channel_name }}</p>
                  <p>구독자 {{ channel.channel_subscribe }}명</p>
                  <p>{{ channel.channel_video_cnt }}개 영상</p>
                </div>
              </router-link>
            </v-list-item>
          </div>
        </div>
        <div class="ranking-list">
          <div class="ranking-title">
            <span>평균 조회수 순</span>
            <router-link to="/home">더 보기</router-link>
          </div>
          <div class="ranking-body">
            <v-list-item class="ranking-item" v-for="(channel, index) in homeViewsChannelRanking" :key="index">
              <router-link :to="{ name: 'Channel', params: { channelId: channel._id } }">
                <img :src="channel.channel_img" />
                <div>
                  <p>{{ channel.channel_name }}</p>
                  <p>구독자 {{ channel.channel_subscribe }}명</p>
                  <p>{{ channel.channel_video_cnt }}개 영상</p>
                </div>
              </router-link>
            </v-list-item>
          </div>
        </div>
      </div>
    </article>

    <article class="recommand-channel-section">
      <div class="chart-title">{{ companyIndustry }} 채널 추천</div>
      <div class="card">
        <HomeRecommandChannels></HomeRecommandChannels>
      </div>
    </article>

    <article class="recommand-video-section">
      <div class="chart-title">{{ companyIndustry }} 채널 추천</div>
      <div class="card">
        <HomeRecommandChannels></HomeRecommandChannels>
      </div>
    </article>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import HomeRecommandChannels from '@/components/HomeComponents/HomeRecommandChannels.vue'

export default {
  name: 'Home',
  components: {
    HomeRecommandChannels
  },
  data() {
    return {
      allExposureLineChartData: {},
      indExposureLineChartData: {},
      allExposureDoughnutChartData: {},
      indExposureDoughnutChartData: {}
    }
  },
  computed: {
    ...mapState('homeStore', ['homeSubscribeChannelRanking', 'homeViewsChannelRanking', 'companyIndustry']),
    ...mapState('chartDataStore', ['companyData'])
  },
  methods: {
    ...mapActions('homeStore', ['getChannelRankingData', 'getCompanyIndustry']),
    ...mapActions('chartDataStore', ['createChart', 'getCompanyData'])
  },
  async created() {
    console.log('home mounted')
    await this.getCompanyIndustry()
    await this.getCompanyData()
    await this.getChannelRankingData()

    // companyData 내림차순 정렬
    this.companyData.sort((a, b) => parseFloat(b.company_four_week[3]) - parseFloat(a.company_four_week[3]))
    const colorsArray = [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)'
    ]
    const lineChartOptions = {
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

    // allExposureLineChartData
    const allExposureCompany = this.companyData.slice(0, 5)
    const allExposureLineChartDatasets = allExposureCompany.map((company, companyIndex) => {
      return {
        label: company.company_name,
        data: company.company_four_week,
        borderColor: colorsArray[companyIndex],
        backgroundColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: colorsArray[companyIndex]
      }
    })
    this.allExposureLineChartData = {
      type: 'line',
      data: {
        labels: ['4', '3', '2', '1'],
        datasets: allExposureLineChartDatasets
      },
      options: lineChartOptions
    }
    console.log(this.allExposureLineChartData)
    this.createChart({ chartId: 'all-exposure-line-chart', chartData: this.allExposureLineChartData })

    // indExposureLineChartData
    const indExposureCompany = this.companyData
      .filter(company => company.company_industry === this.companyIndustry)
      .slice(0, 5)
    const indExposureLineChartDatasets = indExposureCompany.map((company, companyIndex) => {
      return {
        label: company.company_name,
        data: company.company_four_week,
        borderColor: colorsArray[companyIndex],
        backgroundColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: colorsArray[companyIndex]
      }
    })
    this.indExposureLineChartData = {
      type: 'line',
      data: {
        labels: ['4', '3', '2', '1'],
        datasets: indExposureLineChartDatasets
      },
      options: lineChartOptions
    }
    console.log(this.indExposureLineChartData)
    this.createChart({ chartId: 'ind-exposure-line-chart', chartData: this.indExposureLineChartData })
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/Home/home.scss';
@import '@/scss/charts.scss';
</style>

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

    <!-- Today TamTam Recommand Section -->
    <article class="today-recommand-section">
      <div class="chart-title">오늘의 탐탐 추천 채널</div>
      <div class="card chart-body">
        오늘의 탐탐 추천 채널
      </div>
    </article>

    <!-- 변동상황
    <article class="today-recommand-section">
      <div class="chart-title">오늘의 탐탐 추천 채널</div>
      <div class="card">
        오늘의 탐탐 추천 채널
      </div>
    </article> -->

    <!-- Ranking Section -->
    <article class="channel-ranking-section">
      <div class="chart-title">채널 Top 5</div>
      <div class="card">
        <HomeChannelRanking />
      </div>
    </article>

    <!-- Recommand Channel Section -->
    <article class="recommand-channel-section">
      <div class="chart-title">{{ companyIndustry }} 카테고리 채널 추천</div>
      <div class="card">
        <HomeRecommandChannels />
      </div>
    </article>

    <!-- Recommand Video Section -->
    <article class="recommand-video-section">
      <div class="chart-title">{{ companyIndustry }} 카테고리 영상 추천</div>
      <div class="card">
        <HomeRecommandVideos />
      </div>
    </article>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import HomeChannelRanking from '@/components/HomeComponents/HomeChannelRanking.vue'
import HomeRecommandChannels from '@/components/HomeComponents/HomeRecommandChannels.vue'
import HomeRecommandVideos from '@/components/HomeComponents/HomeRecommandVideos.vue'

export default {
  name: 'Home',
  components: {
    HomeChannelRanking,
    HomeRecommandChannels,
    HomeRecommandVideos
  },
  data() {
    return {
      allExposureLineChartData: {},
      indExposureLineChartData: {},
      allExposureDoughnutChartData: {},
      indExposureDoughnutChartData: {},
      colorsArray: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      lineChartOptions: {
        legend: {
          display: false,
          position: 'bottom',
          align: 'end',
          labels: {
            boxWidth: 3,
            padding: 10,
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
      },
      DoughnutChartOptions: {
        layout: {
          padding: {
            left: 30,
            right: 30,
            top: 0,
            bottom: 0
          }
        },
        cutoutPercentage: 70,
        legend: {
          // display: false,
          position: 'right',
          align: 'center',
          labels: {
            boxWidth: 8,
            padding: 15,
            rtl: true,
            fontSize: 14
          }
        }
      }
    }
  },
  computed: {
    ...mapState('homeStore', ['companyIndustry']),
    ...mapState('chartDataStore', ['companyData'])
  },
  methods: {
    ...mapActions('homeStore', ['getCompanyIndustry']),
    ...mapActions('chartDataStore', ['createChart', 'getCompanyData']),

    makeAllExposureLineChart: function(allExposureCompany) {
      const allExposureLineChartDatasets = allExposureCompany.map((company, companyIndex) => {
        return {
          label: company.company_name,
          data: company.company_four_week,
          borderColor: this.colorsArray[companyIndex],
          backgroundColor: 'rgba(0, 0, 0, 0)',
          pointBackgroundColor: this.colorsArray[companyIndex]
        }
      })
      this.allExposureLineChartData = {
        type: 'line',
        data: {
          labels: ['4', '3', '2', '1'],
          datasets: allExposureLineChartDatasets
        },
        options: this.lineChartOptions
      }
      this.createChart({ chartId: 'all-exposure-line-chart', chartData: this.allExposureLineChartData })
    },

    makeAllExposureDoughnutChart: function(allExposureCompany) {
      const allExposureDoughnutChartDatasets = allExposureCompany.map(company => company.company_four_week[3])
      const allExposureDoughnutChartlabels = allExposureCompany.map(company => company.company_name)
      this.allExposureDoughnutChartData = {
        type: 'pie',
        data: {
          datasets: [
            {
              data: allExposureDoughnutChartDatasets,
              backgroundColor: this.colorsArray,
              borderWidth: 0
            }
          ],
          labels: allExposureDoughnutChartlabels
        },
        options: this.DoughnutChartOptions
      }
      this.createChart({ chartId: 'all-exposure-doughnut-chart', chartData: this.allExposureDoughnutChartData })
    },

    makeIndExposureLineChart: function(indExposureCompany) {
      const indExposureLineChartDatasets = indExposureCompany.map((company, companyIndex) => {
        return {
          label: company.company_name,
          data: company.company_four_week,
          borderColor: this.colorsArray[companyIndex],
          backgroundColor: 'rgba(0, 0, 0, 0)',
          pointBackgroundColor: this.colorsArray[companyIndex]
        }
      })
      this.indExposureLineChartData = {
        type: 'line',
        data: {
          labels: ['4', '3', '2', '1'],
          datasets: indExposureLineChartDatasets
        },
        options: this.lineChartOptions
      }
      this.createChart({ chartId: 'ind-exposure-line-chart', chartData: this.indExposureLineChartData })
    },

    makeIndExposureDoughnutChart: function(indExposureCompany) {
      const indExposureDoughnutChartDatasets = indExposureCompany.map(company => company.company_four_week[3])
      const indExposureDoughnutChartlabels = indExposureCompany.map(company => company.company_name)
      this.indExposureDoughnutChartData = {
        type: 'pie',
        data: {
          datasets: [
            {
              data: indExposureDoughnutChartDatasets,
              backgroundColor: this.colorsArray,
              borderWidth: 0
            }
          ],
          labels: indExposureDoughnutChartlabels
        },
        options: this.DoughnutChartOptions
      }
      this.createChart({ chartId: 'ind-exposure-doughnut-chart', chartData: this.indExposureDoughnutChartData })
    }
  },
  async created() {
    await this.getCompanyIndustry()
    await this.getCompanyData()

    // companyData 내림차순 정렬
    this.companyData.sort((a, b) => parseFloat(b.company_four_week[3]) - parseFloat(a.company_four_week[3]))

    const allExposureCompany = this.companyData.slice(0, 5)
    this.makeAllExposureLineChart(allExposureCompany)
    this.makeAllExposureDoughnutChart(allExposureCompany)

    const indExposureCompany = this.companyData
      .filter(company => company.company_industry === this.companyIndustry)
      .slice(0, 5)
    this.makeIndExposureLineChart(indExposureCompany)
    this.makeIndExposureDoughnutChart(indExposureCompany)
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/Home/home.scss';
@import '@/scss/charts.scss';
</style>

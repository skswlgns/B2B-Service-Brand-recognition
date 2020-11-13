<template>
  <div>
    <div class="chart-body">
      <div align="right">
        <v-select @input="changedLabel" :items="items" label="비교하기" solo> </v-select>
      </div>

      <canvas id="all-exposure-chart"></canvas>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import cookies from 'vue-cookies'
import Chart from 'chart.js'
const companyStore = 'companyStore'

export default {
  name: 'Main1',
  data() {
    return {
      newChart: null,
      selected: null,
      company_id: null,
      company_nickname: cookies.get('nick'),
      items: [],
      myChartData: {
        label: this.company_nickname,
        data: [5, 7, 9, 12],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)'
      },
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
      }
    }
  },
  computed: {
    ...mapState(companyStore, ['companyList'])
  },
  methods: {
    ...mapActions(companyStore, ['getCompanyList']),
    changedLabel(event) {
      this.selected = event
      const tmp = {
        label: this.selected,
        data: [2, 3, 3, 2],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: 'rgba(153, 102, 255, 1)'
      }
      this.allExposureData.data.datasets = []
      this.allExposureData.data.datasets.push(this.myChartData)
      this.allExposureData.data.datasets.push(tmp)
      this.updateChart({ chartId: 'all-exposure-chart', chartData: this.allExposureData })
    },
    init() {
      for (let index = 0; index < this.companyList.length; index++) {
        const element = this.companyList[index].company_nickname
        if (this.company_nickname === element || element === '관리자' || element === '탈퇴할 아이디') {
          continue
        }
        this.items.push(element)
      }
    },
    updateChart({ chartId, chartData }) {
      this.newChart.data = chartData.data
      this.newChart.update()
    },
    createChart({ chartId, chartData }) {
      this.ctx = document.getElementById(chartId)
      this.newChart = new Chart(this.ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
    }
  },

  async created() {
    this.myChartData.label = this.company_nickname
    this.allExposureData.data.datasets.push(this.myChartData)
    await this.getCompanyList()
    await this.init()
    this.createChart({ chartId: 'all-exposure-chart', chartData: this.allExposureData })
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '@/scss/charts.scss';
</style>

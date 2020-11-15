<template>
  <div>
    <div align="right" class="chart-title">
      <v-menu offset-y max-height="40%">
        <template v-slot:activator="{ on, attrs }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn depressed color="white" small v-bind="attrs" v-on="{ ...tooltip, ...on }">
                <i class="fas fa-swords"></i>
              </v-btn>
            </template>
            <span>비교하기</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item-group v-model="selected" color="rgba(153, 102, 255, 1)">
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-content @click="changedLabel(item, index)">{{ item }} </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </div>
    <canvas id="all-exposure-chart"></canvas>
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
      fourweekDatas: [],
      myChartData: {
        label: this.company_nickname,
        data: [],
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
    changedLabel(nick, index) {
      this.selected = nick
      const tmp = {
        label: nick,
        data: this.fourweekDatas[index],
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
        if (this.company_nickname === element) {
          this.myChartData.data = this.companyList[index].company_four_week
          continue
        } else if (element === '관리자' || element === '탈퇴할 아이디') {
          continue
        }
        this.items.push(element)
        this.fourweekDatas.push(this.companyList[index].company_four_week)
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
    await this.getCompanyList()
    this.myChartData.label = this.company_nickname
    this.allExposureData.data.datasets.push(this.myChartData)
    await this.init()
    this.createChart({ chartId: 'all-exposure-chart', chartData: this.allExposureData })
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '@/scss/charts.scss';
</style>

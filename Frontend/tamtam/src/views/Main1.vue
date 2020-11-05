<template>
  <div class="frame">
    <div class="main1">
      <div class="card-title">전체 브랜드 노출 순위</div>
      <div class="frame">
        <div class="whole shadow">
          <canvas id="wChart"></canvas>
        </div>
        <div class="shadow">
          <canvas id="wCircle"></canvas>
        </div>
      </div>
      <div class="card-title">업계 브랜드 노출 순위</div>
      <div class="frame">
        <div class="whole shadow">
          <canvas id="cLine"></canvas>
        </div>
        <div class="whole shadow">
          <canvas id="cDoughnut"></canvas>
        </div>
      </div>
      <div class="card-title">YouTuber</div>
      <div class="frame">
        <div class="shadow rank_fr">
          <span>구독자순</span>
          <div class="rank">
            <v-card class="mx-auto" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
                <v-list-item-content>
                  <div class="overline mb-4">
                    OVERLINE
                  </div>
                  <v-list-item-title class="headline mb-1">
                    Headline 5
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </div>
        </div>
        <div class="shadow rank_fr">
          <span>구독자순</span>
          <div class="rank">
            <v-card class="mx-auto" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
                <v-list-item-content>
                  <div class="overline mb-4">
                    OVERLINE
                  </div>
                  <!-- <v-list-item-title class="headline mb-1">
                    Headline 5
                  </v-list-item-title> -->
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </div>
        </div>
        <div class="shadow rank_fr">
          <span>구독자순</span>
          <div class="rank">
            <v-card class="mx-auto" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
                <v-list-item-content>
                  <div class="overline mb-4">
                    OVERLINE
                  </div>
                  <v-list-item-title class="headline mb-1">
                    Headline 5
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'Main1',
  data() {
    return {
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
      wholeCirlce: {
        type: 'pie',
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
      induLine: {
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
      induDoughnut: {
        type: 'doughnut',
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
      }
    }
  },
  methods: {
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
  mounted() {
    this.createChart('wChart', this.wholeData)
    this.createChart('wCircle', this.wholeCirlce)
    this.createChart('cLine', this.induLine)
    this.createChart('cDoughnut', this.induDoughnut)
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/main1.scss';
</style>

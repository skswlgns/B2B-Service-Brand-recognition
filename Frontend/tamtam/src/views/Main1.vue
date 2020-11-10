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
        <div class="rank_fr">
          <div class="rank-title">
            <div>구독자순</div>
            <router-link to="/whole">더 보기</router-link>
          </div>
          <div class="rank">
            <v-card v-for="(subscribe, i) in subscribeData" :key="i" class="mx-auto mb-2" max-width="344" outlined>
              <v-list-item three-line>
                <img :src="subscribe.channel_img" width="80px" />
                <v-list-item-content>
                  <router-link
                    :to="{ name: 'Channel', params: { channelId: subscribe._id } }"
                    class="overline mb-4 headline"
                  >
                    {{ subscribe.channel_name }}
                  </router-link>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </div>
        </div>
        <div class="rank_fr">
          <div class="rank-title">
            <div>구독자순</div>
            <router-link to="/whole">더 보기</router-link>
          </div>
          <div class="rank">
            <v-card v-for="(view, i) in viewsData" :key="i" class="mx-auto mt-2" max-width="344" outlined>
              <v-list-item three-line>
                <img :src="view.channel_img" width="80px" />
                <v-list-item-content>
                  <router-link to="" class="overline mb-4">
                    {{ view.channel_name }}
                  </router-link>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </div>
        </div>
        <!-- <div class="rank_fr">
          <div class="rank-title">
            <div>구독자순</div>
            <router-link to="/whole">더 보기</router-link>
          </div>
          <div class="rank">
            <v-card v-for="(channel, i) in channelData" :key="i" class="mx-auto mt-2" max-width="344" outlined>
              <v-list-item three-line>
                <img :src="channel.channel_img" width="80px" />
                <v-list-item-content>
                  <router-link to="" class="overline mb-4">
                    {{ channel.channel_name }}
                  </router-link>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
import { mapState, mapActions } from 'vuex'

const wholeStore = 'wholeStore'

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
  computed: {
    ...mapState(wholeStore, ['subscribeData', 'viewsData'])
  },
  methods: {
    ...mapActions(wholeStore, ['getChannel']),
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
  created() {
    this.getChannel()
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

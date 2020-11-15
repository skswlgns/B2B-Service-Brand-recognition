<template>
  <div class="fr">
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
              <v-btn icon @click="moveYoutube(channelData.channel_youtube_id)" color="white">
                <v-avatar size="30">
                  <img alt="user" src="https://i.pinimg.com/originals/21/22/ee/2122ee7f9df41666d2ff5c634d6a5c2d.png" />
                </v-avatar>
              </v-btn>
              <v-btn icon @click="scrapChannel(channelData._id)" color="white">
                <v-icon color="grey darken-3" v-show="!show">
                  mdi-star-outline
                </v-icon>
                <v-icon color="yellow darken-3" v-show="show">
                  mdi-star
                </v-icon>
              </v-btn>
            </div>
            <v-btn color="#916bf6" @click="sendTest(channelData.channel_name, channelData.channel_email)"
              >광고 문의</v-btn
            >
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
      <Video />
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
import { mapState, mapGetters, mapActions } from 'vuex'
import cookies from 'vue-cookies'
import Video from '@/components/Video.vue'
import emailjs from 'emailjs-com'

const channelStore = 'channelStore'

export default {
  name: 'Channel',
  components: {
    Video
  },
  data() {
    return {
      show: false,
      company_id: cookies.get('companyId'),
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
      },
      templateParams: {
        reply_to: cookies.get('nick') + '@test.com',
        from_name: cookies.get('nick'),
        to_name: '',
        to_email: ''
      }
    }
  },
  props: {
    channelId: {
      type: String
    }
  },
  methods: {
    ...mapActions(channelStore, ['scrap']),
    ...mapActions(channelStore, ['change', 'getChannelData', 'getVideo']),
    moveYoutube(channerId) {
      window.open('https://www.youtube.com/channel/' + channerId)
    },
    createChart(charId, chartData) {
      const ctx = document.getElementById(charId)
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
      return myChart
    },
    async scrapChannel(id) {
      let answer
      if (this.show === true) {
        answer = confirm('스크랩 취소 하시겠습니까?')
      } else {
        answer = confirm('스크랩 하시겠습니까?')
      }
      if (answer) {
        await this.scrap(id)
        // 데이터 다시 받아오기
        await this.getChannelData(this.channelId)
        this.changeShow()
      }
    },
    changeShow() {
      let flag = false
      for (const iterator of this.channelData.scrap_company_id) {
        if (iterator === this.company_id) {
          flag = true
          break
        }
      }
      if (flag) {
        this.show = true
      } else {
        this.show = false
      }
    },
    sendTest(channelName, channelEmail) {
      this.templateParams.to_name = channelName
      this.templateParams.to_email = channelEmail
      emailjs.send('service_TamTam', 'template_g5xblzj', this.templateParams, 'user_BP95v5BDBqPIPT05EQ1nY')
      alert('광고문의를 전달하였습니다.')
    }
  },
  computed: {
    ...mapState(channelStore, ['isActive', 'channelData', 'youtubeChannelId']),
    ...mapGetters(channelStore, ['sliceViews'])
  },
  created() {
    this.getChannelData(this.channelId)
  },
  async mounted() {
    await this.createChart('wChart', this.wholeData)
    await this.createChart('subscribe-line', this.subData)
    await this.getChannelData(this.channelId)
    this.changeShow()
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
@import '@/scss/channel.scss';
</style>

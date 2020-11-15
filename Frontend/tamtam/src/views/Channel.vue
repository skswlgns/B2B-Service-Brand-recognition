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
            <v-btn
              color="#916bf6"
              @click="sendTest(channelData.channel_name, channelData.channel_email, channelData._id)"
              >광고 문의</v-btn
            >
          </div>
        </div>
      </div>
    </div>
    <div class="chart-fr">
      <div class="card ml-2">
        <div class="toggle">
          <span @click="changeActive('bar')">채널의 브랜드 노출 수량</span>
          <span @click="changeActive('donut')">채널의 브랜드 노출 비율</span>
        </div>
        <canvas id="brand-count" class=""></canvas>
        <canvas id="brand-ratio" class=""></canvas>
      </div>
      <div class="card ml-2">
        <div class="toggle">
          <span @click="change('subscribe')">구독자수</span>
          <span @click="change('views')">일일 조회수</span>
        </div>
        <canvas id="subscribe-line" class=""></canvas>
        <canvas id="views-line" class=""></canvas>
      </div>
    </div>
    <div class="card">
      <v-row no-gutters>
        <v-col class="pa-2" v-for="(video, i) in videoData" :key="i" cols="12" sm="3">
          <v-card class="mx-auto data" outlined tile>
            <a @click="moveVideoDetail(video.video_youtube_id)">
              <v-img alt="user" :src="video.video_thumbnails" />
            </a>
            <v-flex>
              <div class="data-title">
                {{ video.video_title }}
              </div>
            </v-flex>
            <div class="data-subtitle pb-2">조회수 {{ wathchCnt(video.video_views) }}</div>
            <v-expand-transition>
              <v-card-text>
                <canvas :id="video._id" />
              </v-card-text>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
      <infinite-loading @infinite="infiniteHandler" spinner="circles" />
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
import { mapState, mapGetters, mapActions } from 'vuex'
import cookies from 'vue-cookies'
import emailjs from 'emailjs-com'
import InfiniteLoading from 'vue-infinite-loading'
import axios from 'axios'
import router from '@/router'
const channelStore = 'channelStore'
const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL
const _ = require('lodash')

export default {
  name: 'Channel',
  components: {
    InfiniteLoading
  },
  data() {
    return {
      show: false,
      company_id: cookies.get('companyId'),
      limit: 0,
      brand: {
        type: '',
        data: {
          labels: [],
          datasets: [
            {
              label: '# of Votes',
              data: [],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 1
            }
          ]
        },
        options: {}
      },
      subData: {
        type: 'line',
        data: {
          labels: ['4w', '3w', '2w', '1w'],
          datasets: [
            {
              label: '4주간 변화 추이',
              data: [],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 1
            }
          ]
        }
      },
      templateParams: {
        reply_to: cookies.get('nick') + '@test.com',
        from_name: cookies.get('nick'),
        to_name: '',
        to_email: ''
      },
      config: {
        headers: {
          token: cookies.get('token'),
          limit: 0
        }
      },
      videoData: [],
      Id: '',
      chartData: {
        type: 'doughnut',
        data: {
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: []
            }
          ]
        },
        options: {
          responsive: true,
          legend: {
            position: 'right',
            align: 'center',
            labels: {
              boxWidth: 3,
              padding: 10,
              rtl: true
            }
          },
          maintainAspectRatio: false,
          animation: false,
          pieceLabel: { mode: 'value', position: 'inside', fontSize: 11, fontStyle: 'bold' },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                return data.labels[tooltipItem.index] + ': ' + data.datasets[0].data[tooltipItem.index] + '%'
              }
            }
          }
        }
      }
    }
  },
  props: {
    channelId: {
      type: String
    }
  },
  methods: {
    ...mapActions(channelStore, [
      'change',
      'getChannelData',
      'getVideo',
      'getBrandRatio',
      'scrap',
      'changeActive',
      'contactYoutuber'
    ]),
    moveYoutube(channerId) {
      window.open('https://www.youtube.com/channel/' + channerId)
    },
    moveVideoDetail(id) {
      router.push({ name: 'VideoDetail', params: { video_youtube_id: id } })
    },
    createChart(charId, chartData) {
      const ctx = document.getElementById(charId)
      if (charId === 'subscribe-line') {
        chartData.data.datasets[0].data = this.four_week_subs.slice(0, 4)
      } else if (charId === 'views-line') {
        chartData.data.datasets[0].data = this.four_week_views.slice(0, 4)
      } else if (charId === 'brand-count') {
        chartData.type = 'bar'
        chartData.data.labels = _.cloneDeep(chartData.data.labels)
        chartData.data.datasets[0].data = _.cloneDeep(chartData.data.datasets[0].data)
        for (const [key, value] of Object.entries(this.channelBrand.channel_brand)) {
          if (value) {
            chartData.data.labels.push(key)
            chartData.data.datasets[0].data.push(value)
          }
        }
      } else if (charId === 'brand-ratio') {
        chartData.data.labels = []
        chartData.data.datasets[0].data = []
        for (const [key, value] of Object.entries(this.channelBrand.channel_brand)) {
          chartData.type = 'doughnut'
          if (value) {
            chartData.data.labels.push(key)
            chartData.data.datasets[0].data.push(value / this.channelBrand.channel_total)
          }
        }
      }
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
    sendTest(channelName, channelEmail, channelId) {
      this.templateParams.to_name = channelName
      this.templateParams.to_email = channelEmail
      emailjs.send('service_TamTam', 'template_g5xblzj', this.templateParams, 'user_BP95v5BDBqPIPT05EQ1nY')
      this.contactYoutuber(channelId)
      alert('광고문의를 전달하였습니다.')
    },
    infiniteHandler($state) {
      axios
        .get(`${API_SERVER_URL}/video/videos/${this.channelId}`, this.config)
        .then(response => {
          setTimeout(() => {
            for (let k = 0; k < response.data.length; k++) {
              response.data[k].chartData = _.cloneDeep(this.chartData)
              response.data[k].chart = response.data[k]._id
            }
            if (response.data.length) {
              this.videoData = this.videoData.concat(response.data)
              $state.loaded()
              this.config.headers.limit += 4
              for (let i = 0; i < response.data.length; i++) {
                // this.videoData.chart = null
                if (response.data[i].video_record) {
                  for (let j = 0; j < response.data[i].video_record.length; j++) {
                    response.data[i].chartData.data.datasets[0].data.push(
                      Math.round(
                        (response.data[i].video_record[j].total_exposure_time / response.data[i].video_total) * 100
                      )
                    )
                    response.data[i].chartData.data.datasets[0].backgroundColor.push(this.dynamicColors())
                    response.data[i].chartData.data.labels.push(
                      response.data[i].video_record[j].company_id.company_nickname
                    )
                  }
                  // this.createChart(this.videoData[i]._id, this.videoData[i].chartData)
                } else {
                  console.log('없음')
                }
              }
              if (this.videoData.length / 4 === 0) {
                $state.complete()
              }
            } else {
              $state.complete()
            }
          }, 1000)
        })
        .catch(error => {
          console.log(error)
        })
    },
    dynamicColors() {
      const r = Math.floor(Math.random() * 255)
      const g = Math.floor(Math.random() * 255)
      const b = Math.floor(Math.random() * 255)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    },
    wathchCnt(count) {
      if (count < 1000) return count + '회'
      else if (count < 10000) {
        count = parseInt(count / 1000)
        return count + '천회'
      } else {
        count = parseInt(count / 10000)
        return count + '만회'
      }
    }
  },
  computed: {
    ...mapState(channelStore, [
      'isActive',
      'channelData',
      'youtubeChannelId',
      'four_week_subs',
      'four_week_views',
      'channelBrand',
      'active'
    ]),
    ...mapGetters(channelStore, ['sliceViews'])
  },
  async created() {},
  async mounted() {
    await this.getBrandRatio(this.channelId)
    await this.getChannelData(this.channelId)
    await this.createChart('subscribe-line', this.subData)
    await this.createChart('brand-count', this.brand)
    await this.createChart('brand-ratio', this.brand)
    await this.createChart('views-line', this.subData)
    this.changeShow()
    const canvasCount = document.getElementById('brand-count')
    const canvasRatio = document.getElementById('brand-ratio')
    // const canvasSubscribe = document.getElementById('subscribe-line')
    // const canvasViews = document.getElementById('views-line')
    // console.log(canvasRatio, canvasViews, canvasSubscribe, canvasCount)
    // console.log(this.active, this.isActive)
    if (this.active === 'bar') {
      // console.log('들어옴')
      canvasRatio.classList.add('none')
      canvasCount.classList.remove('none')
      canvasCount.classList.add('visual')
    } else {
      // console.log('들어옴2')
      canvasRatio.classList.remove('none')
      canvasRatio.classList.add('visual')
      canvasCount.classList.add('none')
    }
  },

  updated() {
    if (this.videoData.length) {
      for (let i = 0; i < this.videoData.length; i++) {
        this.createChart(this.videoData[i].chart, this.videoData[i].chartData)
      }
    }
  }
}
</script>
<style scoped>
.data {
  transition: all 0.6s;
  top: 0;
}
.data:hover {
  top: -10px;
}
.cursor {
  cursor: pointer;
  color: rgb(92, 107, 192);
  font-weight: bold;
}
.data-title {
  font-size: 0.85rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  margin-top: 8px;
  margin-left: 8px;
}

.data-subtitle {
  font-size: 12px;
  margin-left: 8px;
  color: gray;
}
</style>
<style lang="scss" scoped>
@import '@/scss/channel.scss';
</style>

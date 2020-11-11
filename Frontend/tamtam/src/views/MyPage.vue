<template>
  <div>
    <div class="card" style="margin-top:8px;">
      <v-row>
        <v-col cols="6">
          <div class="text-center" style="border-right: 2px solid #ebebeb;">
            <span @click="toggleAnalysis()" class="cursor"><h5>분석</h5></span>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="text-center">
            <span @click="toggleMypage()" class="cursor"><h5>마이페이지관련</h5></span>
          </div>
        </v-col>
      </v-row>
    </div>

    <div v-if="showAnalysis">
      <div class="card " style="margin-top:8px;">
        <v-row class="mx-2">
          <v-col cols="6">
            <div class="data mb-8 pa-8" style="text-align:center;">
              <v-flex style="margin-top:8px;">
                <v-avatar size="100"> </v-avatar>
              </v-flex>
              <v-flex style="overflow-y: auto; height:100px">
                <h2 style="margin-top:40px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                  총 영상수
                </h2>
                <div class="overline mb-1" outlined>
                  총시간
                </div>
              </v-flex>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="chart-fr">
              <canvas id="subscribe-line"></canvas>
            </div>
          </v-col>
        </v-row>
      </div>
      <!-- <ContactChannel></ContactChannel> -->
      <div class="card-title">관련 유튜버 랭킹</div>
      <Ranking></Ranking>
    </div>
    <div v-else-if="myPage">
      <ScrapChannel class="component"></ScrapChannel>
      <!-- <ScrapVideo style="overflow-y: auto;"></ScrapVideo> -->
      <ScrapVideo class="component"></ScrapVideo>
      <div class="card-title">유투버 추천</div>
      <Recommend></Recommend>
    </div>
  </div>
</template>

<script>
// import ContactChannel from '@/components/ContactChannel.vue'
import ScrapChannel from '@/components/ScrapChannel.vue'
import ScrapVideo from '@/components/ScrapVideo.vue'
import Ranking from '@/components/Ranking.vue'
import Recommend from '@/components/Recommend.vue'
import Chart from 'chart.js'

export default {
  name: 'Search',
  components: {
    ScrapVideo,
    ScrapChannel,
    Ranking,
    Recommend
    // ContactChannel
  },
  data() {
    return {
      showAnalysis: false,
      myPage: true,
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
      }
    }
  },
  methods: {
    toggleAnalysis() {
      this.showAnalysis = true
      this.myPage = false
    },
    toggleMypage() {
      this.showAnalysis = false
      this.myPage = true
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
    async scrapCancel(index) {
      let answer
      if (this.show === true) {
        answer = confirm('스크랩 취소 하시겠습니까?')
      } else {
        answer = confirm('스크랩 하시겠습니까?')
      }
      if (answer) {
        await this.scrap(this.channelId)
        // 데이터 다시 받아오기
        await this.getChannelData(this.channelId)
        this.changeShow()
      }
    }
  },
  async mounted() {
    await this.createChart('subscribe-line', this.subData)
  },
  updated() {
    this.createChart('views-line', this.viewsData)
  }
}
</script>
<style scoped>
.title-img {
  width: 80px;
  height: 114px;
}
.bg {
  background-color: #c0c0c0;
}
.cursor {
  cursor: pointer;
  color: rgb(92, 107, 192);
  font-weight: bold;
}
.cont {
  margin: 0 20%;
}
.component {
  margin-top: 8px;
}
</style>

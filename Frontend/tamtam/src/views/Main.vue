<template>
  <div>
    <p class="tit">유튜버와 컨택하세요.</p>
    <p class="subtitle">
      유튜브 내의 브랜드 노출 통계를 확인하여 마음에 드는 유튜버와 컨택해보세요.
    </p>
    <div class="text-center">
      <v-btn class="ma-2 white--text" color="#654a86" x-large @click="goLogin()">
        서비스 이용하기
      </v-btn>
    </div>
    <p class="start-intro2">
      차트를 통한 간편한 확인
    </p>
    <p class="subtitle">동영상 내에 어떠한 브랜드가 얼마나 나왔는지 확인해보세요.</p>
    <v-row class="mx-3">
      <v-col v-for="(tube, index) in youtube" :key="index" cols="3">
        <v-card class="mx-auto start-intro" max-width="400">
          <v-img class="white--text align-end" height="200px" :src="tube.thumbs"> </v-img>

          <p class="mx-2 mt-1" v-if="tube.title && tube.title.length > 20">{{ tube.title.slice(0, 20) }}...</p>
          <p class="mx-2 mt-1" v-else>{{ tube.title }}</p>

          <p class="mx-2 mt-2">조회수: {{ tube.views }} ‧ {{ tube.date }}</p>

          <v-card-text class="text--primary">
            <canvas :id="tube.chart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <p class="start-intro2">기업 동향을 확인</p>
    <p class="subtitle">내 기업 유튜버 순위, 컨택한 유튜버의 동향을 살피세요.</p>
    <p class="cont10">내 기업 현황</p>
  </div>
</template>
<script>
import Chart from 'chart.js'

export default {
  data() {
    return {
      youtube: [
        {
          thumbs:
            'https://i.ytimg.com/vi/fVJkYS5oC_w/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAgAvj6hVCrWwH5yiyS1mg5Dbbo_w',
          title: '[100만 구독자 이벤트] 신세경의 Cook & Talk - 두 번째 이야기',
          views: 297296,
          date: '2020. 8. 30',
          Circle: {
            type: 'doughnut',
            data: {
              labels: ['삼성', 'LG', '애플', 'Sony', 'Philips'],
              datasets: [
                {
                  data: [70, 8, 4, 8, 10],
                  backgroundColor: [
                    this.dynamicColors(),
                    this.dynamicColors(),
                    this.dynamicColors(),
                    this.dynamicColors(),
                    this.dynamicColors()
                  ]
                }
              ]
            },
            options: {
              responsive: true,
              legend: { position: 'right' },
              maintainAspectRatio: false,
              animation: false,
              pieceLabel: { mode: 'value', position: 'inside', fontSize: 11, fontStyle: 'bold' }
            }
          },
          chart: 'chart0'
        },
        {
          thumbs:
            'https://i.ytimg.com/vi/I3FdG5-VekE/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB0YK5W_PYwGU8xPQP5U3HQge8fpw',
          title: '[SUB] 저 이사했어요! 새 집 첫 브이로그. 서재 정리. 집김밥 만들어 먹기. (쿠키 영상 있음)',
          views: 2232998,
          date: '2020. 8. 23',
          Circle: {
            type: 'doughnut',
            data: {
              labels: ['Fila', 'Comdegarson', 'Nike', 'Adidas', 'Guess'],
              datasets: [
                {
                  data: [20, 9, 30, 22, 19],
                  backgroundColor: [
                    this.dynamicColors(),
                    this.dynamicColors(),
                    this.dynamicColors(),
                    this.dynamicColors(),
                    this.dynamicColors()
                  ]
                }
              ]
            },
            options: {
              responsive: true,
              legend: { position: 'right' },
              maintainAspectRatio: false,
              animation: false,
              pieceLabel: { mode: 'value', position: 'inside', fontSize: 11, fontStyle: 'bold' }
            }
          },
          chart: 'chart1'
        },
        {
          thumbs:
            'https://i.ytimg.com/vi/Ywq_Lfsz4A4/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCZ4uZ1YXXxJLKDFC3iztyWJeIe5w',
          title: 'EP6. 부산여행',
          views: 154659,
          date: '2020. 10. 24',
          Circle: {
            type: 'doughnut',
            data: {
              labels: ['삼성', 'Fila', 'Nike', '애플', 'Philips'],
              datasets: [
                {
                  data: [81, 6, 7, 1, 5],
                  backgroundColor: [
                    this.dynamicColors(),
                    this.dynamicColors(),
                    this.dynamicColors(),
                    this.dynamicColors(),
                    this.dynamicColors()
                  ]
                }
              ]
            },
            options: {
              responsive: true,
              legend: { position: 'right' },
              maintainAspectRatio: false,
              animation: false,
              pieceLabel: { mode: 'value', position: 'inside', fontSize: 11, fontStyle: 'bold' }
            }
          },
          chart: 'chart2'
        },
        {
          thumbs:
            'https://i.ytimg.com/vi/E3jhB5Uou6E/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAE4qa3eFBehqzF_f52Iidpcj2Gfg',
          title: '고양이를 안아보았어요 ㅋㅋㅋㅋㅋ',
          views: 599823,
          date: '2020. 10. 22',
          Circle: {
            type: 'doughnut',
            data: {
              labels: ['삼성', 'LG', 'Guess', 'Comdegarson', 'Sony'],
              datasets: [
                {
                  data: [71, 3, 10, 8, 8],
                  backgroundColor: [
                    this.dynamicColors(),
                    this.dynamicColors(),
                    this.dynamicColors(),
                    this.dynamicColors(),
                    this.dynamicColors()
                  ]
                }
              ]
            },
            options: {
              responsive: true,
              legend: { position: 'right' },
              maintainAspectRatio: false,
              animation: false,
              pieceLabel: { mode: 'value', position: 'inside', fontSize: 11, fontStyle: 'bold' }
            }
          },
          chart: 'chart3'
        }
      ]
    }
  },
  methods: {
    goLogin() {
      this.$router.push('/login').catch(() => {})
    },

    dynamicColors() {
      const r = Math.floor(Math.random() * 255)
      const g = Math.floor(Math.random() * 255)
      const b = Math.floor(Math.random() * 255)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    },

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
    for (let i = 0; i < 4; i++) {
      const chart = 'chart' + i
      this.createChart(chart, this.youtube[i].Circle)
    }
  }
}
</script>

<style scoped>
@import '../scss/introduce.scss';
</style>

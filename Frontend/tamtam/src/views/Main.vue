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
    <div class="cont10">
      <p class="intro-industry mt-3">내 기업 현황</p>
      <v-row class="mb-4">
        <v-card class="mx-auto" cols="3">
          <v-card-text>
            <div class="text-center">컨택한 유튜버 수</div>
            <div class="d-flex mt-2">
              <div>
                <v-icon large color="#654a86">
                  mdi-account-switch-outline
                </v-icon>
              </div>
              <div class="ml-7 font-in-card mt-2">
                58
              </div>
            </div>
          </v-card-text>
        </v-card>
        <v-card class="mx-auto" cols="3">
          <v-card-text>
            <div class="text-center">스크랩 유튜버 수</div>
            <div class="d-flex mt-2">
              <div>
                <v-icon large color="#654a86">
                  mdi-star-check
                </v-icon>
              </div>
              <div class="ml-7 font-in-card mt-2">
                12
              </div>
            </div>
          </v-card-text>
        </v-card>
        <v-card class="mx-auto" cols="3">
          <v-card-text>
            <div class="text-center">브랜드 노출 수</div>
            <div class="d-flex mt-2">
              <div>
                <v-icon large color="#654a86">
                  mdi-youtube-subscription
                </v-icon>
              </div>
              <div class="ml-7 font-in-card mt-2">
                3,321
              </div>
            </div>
          </v-card-text>
        </v-card>
        <v-card class="mx-auto" cols="3">
          <v-card-text>
            <div class="text-center">업계 내 순위</div>
            <div class="d-flex mt-2">
              <div>
                <v-icon large color="#654a86">
                  mdi-chess-queen
                </v-icon>
              </div>
              <div class="ml-7 font-in-card mt-2">
                2
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-row>
    </div>
    <p class="intro-industry mt-16 cont10">최근 회사 브랜드 노출된 채널 순위</p>
    <div class="cont10">
      <v-card class="mx-auto my-2">
        <v-card-text>
          <div class="d-flex mt-2 align-center">
            <div class="rank">
              1
            </div>
            <div>
              <v-avatar size="62">
                <img
                  src="https://public.augusta.com/s3fs-public/article/images/MAS0414TIGERWINS485.jpg"
                  alt="wintiger"
                />
              </v-avatar>
            </div>
            <div class="c-title">
              <p class="mb-0">WinTiger Tv</p>
              <p class="c-sub">WinTiger는 승리한 호랑이란 뜻으로 엄청 강력한 채널을 의미합니다.</p>
              <v-icon large color="#654a86">
                mdi-youtube
              </v-icon>
            </div>
            <div class="c-sub ml-10">
              <p class="mb-0">구독자 수</p>
              <p class="c-subscribe">51.6M</p>
            </div>
            <div class="c-sub ml-10">
              <p class="mb-0">일일 조회 수</p>
              <p class="c-subscribe">25.9M</p>
            </div>
            <div class="c-sub ml-10">
              <p class="mb-0">평균 조회 수</p>
              <p class="c-subscribe">29.9M</p>
            </div>
            <img
              src="https://public.augusta.com/s3fs-public/article/images/MAS0414TIGERWINS485.jpg"
              style="height: 100px; width:150px"
              class="ml-auto"
            />
          </div>
        </v-card-text>
      </v-card>
    </div>
    <div class="cont12">
      <v-card class="mx-auto my-2">
        <v-card-text>
          <div class="d-flex mt-2 align-center">
            <div class="rank">
              2
            </div>
            <div>
              <v-avatar size="62">
                <img
                  src="https://lab.ssafy.com/uploads/-/system/user/avatar/1594/avatar.png?width=400"
                  alt="wintiger"
                />
              </v-avatar>
            </div>
            <div class="c-title">
              <p class="mb-0">승범튜브</p>
              <p class="c-sub">SSAFY 3기 존잘러 승범이의 유튜브입니다. 구독! 좋아요! 부탁드립니다!!</p>
              <v-icon large color="#654a86">
                mdi-youtube
              </v-icon>
            </div>
            <div class="c-sub ml-10">
              <p class="mb-0">구독자 수</p>
              <p class="c-subscribe">120.6M</p>
            </div>
            <div class="c-sub ml-10">
              <p class="mb-0">일일 조회 수</p>
              <p class="c-subscribe">58.9M</p>
            </div>
            <div class="c-sub ml-10">
              <p class="mb-0">평균 조회 수</p>
              <p class="c-subscribe">77.9M</p>
            </div>
            <img src="../assets/images/ch_many2.jpg" style="height: 100px; width:150px" class="ml-auto" />
          </div>
        </v-card-text>
      </v-card>
      <v-card class="mx-auto my-2">
        <v-card-text>
          <div class="d-flex mt-2 align-center">
            <div class="rank">
              3
            </div>
            <div>
              <v-avatar size="62">
                <img src="../assets/images/ch_many.jpg" alt="manypeople" />
              </v-avatar>
            </div>
            <div class="c-title">
              <p class="mb-0">CH)Many People</p>
              <p class="c-sub">SSAFY 3기 흥부자 다이니의 채널입니다:) 구독누르고 가라잉~</p>
              <v-icon large color="#654a86">
                mdi-youtube
              </v-icon>
            </div>
            <div class="c-sub ml-10">
              <p class="mb-0">구독자 수</p>
              <p class="c-subscribe">12.6M</p>
            </div>
            <div class="c-sub ml-10">
              <p class="mb-0">일일 조회 수</p>
              <p class="c-subscribe">8.9M</p>
            </div>
            <div class="c-sub ml-10">
              <p class="mb-0">평균 조회 수</p>
              <p class="c-subscribe">4.9M</p>
            </div>
            <img
              src="https://nkcf.org/wp-content/uploads/2017/11/people.jpg"
              style="height: 100px; width:150px"
              class="ml-auto"
            />
          </div>
        </v-card-text>
      </v-card>
      <v-card class="mx-auto my-2">
        <v-card-text>
          <div class="d-flex mt-2 align-center">
            <div class="rank">
              4
            </div>
            <div>
              <v-avatar size="62">
                <img src="../assets/images/knife.png" alt="manypeople" />
              </v-avatar>
            </div>
            <div class="c-title">
              <p class="mb-0">Knife Happy TV</p>
              <p class="c-sub">깔끔맨 임도희 TV다. 보기 싫으면 뒤로가기 눌러라</p>
              <v-icon large color="#654a86">
                mdi-youtube
              </v-icon>
            </div>
            <div class="c-sub ml-10">
              <p class="mb-0">구독자 수</p>
              <p class="c-subscribe">111.6M</p>
            </div>
            <div class="c-sub ml-10">
              <p class="mb-0">일일 조회 수</p>
              <p class="c-subscribe">7.9M</p>
            </div>
            <div class="c-sub ml-10">
              <p class="mb-0">평균 조회 수</p>
              <p class="c-subscribe">6.7M</p>
            </div>
            <img
              src="https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/01/urbanbrush-20200106031312376569.jpg"
              style="height: 100px; width:150px"
              class="ml-auto"
            />
          </div>
        </v-card-text>
      </v-card>
    </div>
    <p class="intro-industry mt-16 cont10">스크랩 유튜버 동향</p>
    <div class="cont12">
      <div class="cont12 my-10">
        <canvas id="chLine"></canvas>
      </div>
    </div>
    <div class="cont10 mt-16">
      <div class="d-flex">
        <div class="ml-auto">
          <span class="c-sub">
            전화문의: 010-1234-5678
          </span>
          <span class="ml-6 c-sub">
            이메일문의: jh8039@naver.com
          </span>
        </div>
      </div>
      <hr class="my-4 c-sub" />
      <div>
        <p class="mb-0 c-sub">고객센터 010-1234-5678 | 평일 상담시간 09:00 ~ 18:00</p>
        <p class="c-sub mb-0">본 사이트의 콘텐츠는 저작권법의 보호를 받는 바 무단 적재, 복사, 배포 등을 금합니다.</p>
        <p class="c-sub">Copyright © TamTam All Rights Reserved.</p>
      </div>
    </div>
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
      ],
      Line: {
        type: 'line',
        data: {
          labels: ['July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'WinTiger Tv',
              // backgroundColor: this.dynamicColors(),
              borderColor: this.dynamicColors(),
              fill: false,
              data: [80, 80, 30, 20, 50, 70]
            },
            {
              label: '승범튜브',
              // backgroundColor: this.dynamicColors(),
              borderColor: this.dynamicColors(),
              fill: false,
              data: [50, 40, 60, 80, 80, 65]
            },
            {
              label: 'CH)Many People',
              // backgroundColor: this.dynamicColors(),
              borderColor: this.dynamicColors(),
              fill: false,
              data: [20, 20, 40, 50, 30, 40]
            },
            {
              label: 'Knife Happly TV',
              // backgroundColor: this.dynamicColors(),
              borderColor: this.dynamicColors(),
              fill: false,
              data: [0, 0, 30, 30, 70, 95]
            }
          ]
        },
        options: {
          title: {
            text: '스크랩 유튜버 동향'
          }
        }
      }
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
    console.log(this.createChart('chLine', this.Line))
  }
}
</script>

<style scoped>
@import '../scss/introduce.scss';
</style>

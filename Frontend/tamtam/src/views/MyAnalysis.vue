<template>
  <div>
    <div class="card " style="margin-top:8px;">
      <v-row class="mx-2">
        <v-col cols="6">
          <div style="text-align:center;">
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
          <div>
            <canvas id="subscribe-line"></canvas>
          </div>
        </v-col>
      </v-row>
    </div>
    <!-- <ContactChannel></ContactChannel> -->
    <Scatter class="component card"></Scatter>
    <ReferenceVideo class="component"></ReferenceVideo>
  </div>
</template>

<script>
import Scatter from '@/components/Scatter.vue'
import ReferenceVideo from '@/components/ReferenceVideo.vue'
import Chart from 'chart.js'
export default {
  name: 'MyAnalysis',
  data() {
    return {
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
  components: {
    ReferenceVideo,
    Scatter
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
    this.createChart('subscribe-line', this.subData)
  }
}
</script>

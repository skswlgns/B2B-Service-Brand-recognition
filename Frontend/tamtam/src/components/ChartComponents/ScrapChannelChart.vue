<template>
  <div>
    <div style="padding:14px;"></div>
    <canvas id="chart"></canvas>
  </div>
</template>
<script>
// Importing Bubble class from the vue-chartjs wrapper
import Chart from 'chart.js'
import { mapActions, mapState } from 'vuex'
const searchStore = 'searchStore'
export default {
  // extends: Bubble,
  data() {
    return {
      datacollection: {
        // Data to be represented on x-axis
        labels: ['Data'],
        datasets: []
      }
    }
  },
  async created() {
    await this.getScrapChannel()
    await this.getData()
    // await this.renderChart(this.datacollection, this.options)
    await this.createChart()
  },
  computed: {
    ...mapState(searchStore, ['channel'])
  },
  methods: {
    ...mapActions(searchStore, ['getScrapChannel']),
    createChart() {
      this.ctx = document.getElementById('chart')
      this.newChart = new Chart(this.ctx, {
        type: 'scatter',
        data: this.datacollection,
        options: {
          tooltips: {
            callbacks: {
              title: function(tooltipItem, data) {
                return data.datasets[tooltipItem[0].datasetIndex].label
              },
              afterBody: function(tooltipItem, data) {
                return (
                  '영상' +
                  data.datasets[tooltipItem[0].datasetIndex].data[0].x +
                  '개 \n' +
                  '구독자' +
                  data.datasets[tooltipItem[0].datasetIndex].data[0].y +
                  '만명'
                )
              },
              label: function(tooltipItem, data) {
                return ''
              }
            },
            // backgroundColor:'',
            titleFontSize: 16
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  min: 0,
                  stepSize: 100,
                  padding: 8,
                  callback: function(value) {
                    return value + '만'
                  }
                },
                gridLines: {
                  display: true
                },
                scaleLabel: {
                  display: true,
                  labelString: '구독자'
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  min: 0,
                  padding: 8,
                  callback: function(value) {
                    return value + '개'
                  }
                },
                gridLines: {
                  display: false
                },
                scaleLabel: {
                  display: true,
                  labelString: '영상수',
                  position: 'right'
                }
              }
            ]
          },
          legend: {
            display: false
          }
        }
      })
    },
    getData() {
      for (let index = 0; index < this.channel.length; index++) {
        const data = this.channel[index]
        const subscribe = parseInt(data.channel_subscribe / 10000)
        const videoCnt = data.channel_video_cnt
        const tmp = {
          radius: 5,
          label: data.channel_name,
          backgroundColor: '#f87979',
          borderWidth: 1,
          pointBorderColor: '#f87979',
          // Data to be represented on y-axis
          data: [
            {
              x: videoCnt,
              y: subscribe,
              r: 5
            }
          ]
        }
        this.datacollection.datasets.push(tmp)
      }
    }
  }
}
</script>

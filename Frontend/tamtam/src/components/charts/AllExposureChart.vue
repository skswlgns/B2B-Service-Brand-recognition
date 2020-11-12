<template>
  <div>
    <div class="chart-body">
      <canvas id="all-exposure-chart"></canvas>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Main1',
  data() {
    return {
      allExposureData: {
        type: 'line',
        data: {
          labels: ['4', '3', '2', '1'],
          datasets: [
            {
              label: 'samsung',
              data: [5, 7, 9, 12],
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              pointBackgroundColor: 'rgba(255, 99, 132, 1)'
            },
            {
              label: 'LG',
              data: [6, 5, 3, 4],
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              pointBackgroundColor: 'rgba(54, 162, 235, 1)'
            },
            {
              label: 'apple',
              data: [1, 3, 2, 1],
              borderColor: 'rgba(255, 206, 86, 1)',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              pointBackgroundColor: 'rgba(255, 206, 86, 1)'
            },
            {
              label: 'sony',
              data: [4, 2, 3, 4],
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              pointBackgroundColor: 'rgba(75, 192, 192, 1)'
            },
            {
              label: 'philips',
              data: [2, 3, 3, 2],
              borderColor: 'rgba(153, 102, 255, 1)',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              pointBackgroundColor: 'rgba(153, 102, 255, 1)'
            }
          ]
          // backgroundColor: [
          //   'rgba(255, 99, 132, 0.2)',
          //   'rgba(54, 162, 235, 0.2)',
          //   'rgba(255, 206, 86, 0.2)',
          //   'rgba(75, 192, 192, 0.2)',
          //   'rgba(153, 102, 255, 0.2)'
          // ],
          // borderColor: [
          //   'rgba(255, 99, 132, 1)',
          //   'rgba(54, 162, 235, 1)',
          //   'rgba(255, 206, 86, 1)',
          //   'rgba(75, 192, 192, 1)',
          //   'rgba(153, 102, 255, 1)'
          // ],
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
    ...mapState('chartDataStore', [])
  },
  methods: {
    ...mapActions('chartDataStore', ['createChart'])
  },
  async created() {},
  mounted() {
    this.createChart({ chartId: 'all-exposure-chart', chartData: this.allExposureData })
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/charts.scss';
</style>

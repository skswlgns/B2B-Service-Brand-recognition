<script>
// Importing Bubble class from the vue-chartjs wrapper
import { Bubble } from 'vue-chartjs'
// Exporting this so it can be used in other components
export default {
  extends: Bubble,
  data() {
    return {
      datacollection: {
        // Data to be represented on x-axis
        labels: ['Data'],
        datasets: [
          {
            label: 'Data one',
            backgroundColor: '#f87979',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            // Data to be represented on y-axis
            data: [
              {
                x: 4.0,
                y: 0,
                r: 5
              },
              {
                x: 6.0,
                y: 30,
                r: 5
              },
              {
                x: 4.0,
                y: 60,
                r: 5
              },
              {
                x: 7.5,
                y: 80,
                r: 5
              },
              {
                x: 2.0,
                y: 30,
                r: 5
              },
              {
                x: 3.5,
                y: 100,
                r: 5
              }
            ]
          },
          {
            label: 'Data Two',
            backgroundColor: '#7C8CF8',
            data: [
              {
                x: 1.0,
                y: 30,
                r: 5
              },
              {
                x: 2.0,
                y: 20,
                r: 5
              },
              {
                x: 1.5,
                y: 8,
                r: 5
              }
            ]
          }
        ]
      },
      // Chart.js options that controls the appearance of the chart
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
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
                beginAtZero: true,
                min: 0,
                max: 7.5,
                stepSize: 0.5
              },
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: true,
                labelString: '일일 조회수'
              }
            }
          ]
        },
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    // renderChart function renders the chart with the datacollection and options object.
    this.renderChart(this.datacollection, this.options)
  }
}
</script>

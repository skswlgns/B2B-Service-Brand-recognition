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
  name: 'AllExposureChart',
  data() {
    return {}
  },
  computed: {
    ...mapState('chartDataStore', [])
  },
  methods: {
    ...mapActions('chartDataStore', ['createChart', 'getCompanyData'])
  },
  async mounted() {
    this.createChart({ chartId: 'all-exposure-chart', chartData: this.allExposureData })
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/charts.scss';
</style>

<template>
  <div>
    <v-row>
      <v-col cols="4">
        <div class="card component">
          <div style="text-align:center; padding: 15%;" class="headline">맻등?</div>
        </div>
      </v-col>
      <v-col cols="4">
        <div class="card component">
          <div style="text-align:center; padding: 15%;" class="headline">총 영상수 : {{ this.companyCount }}</div>
        </div>
      </v-col>
      <v-col cols="4">
        <div class="card component">
          <div style="text-align:center; padding: 15%;" class="headline">총 노출시간 : {{ this.companyTime }}</div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <div class="card component">
          <div class="chart-title">스크랩 채널 비교</div>
          <v-divider></v-divider>
          <ScrapChannelChart />
        </div>
      </v-col>
      <v-col cols="6">
        <div>
          <div class="card component">
            <CompareExposureChart />
          </div>
        </div>
      </v-col>
    </v-row>
    <div class="card component">
      <div class="chart-title">추천 영상</div>
      <v-divider></v-divider>
      <ReferenceVideo style="padding:50px;" />
    </div>
  </div>
</template>

<script>
import ScrapChannelChart from '@/components/ChartComponents/ScrapChannelChart.vue'
import CompareExposureChart from '@/components/ChartComponents/CompareExposureChart.vue'
import ReferenceVideo from '@/components/CompanyAnalysisComponents/ReferenceVideo.vue'
import { mapActions, mapState } from 'vuex'
const companyStore = 'companyStore'

export default {
  name: 'MyAnalysis',
  data() {
    return {}
  },
  components: {
    ReferenceVideo,
    ScrapChannelChart,
    CompareExposureChart
  },
  methods: {
    ...mapActions(companyStore, ['getCount'])
  },
  computed: {
    ...mapState(companyStore, ['companyTime', 'companyCount'])
  },
  created() {
    this.getCount()
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '@/scss/myAnalysis.scss';
@import '@/scss/charts.scss';
</style>

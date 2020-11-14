<template>
  <div>
    <v-layout row>
      <v-flex sm4 pl-10 pr-10>
        <div class="card mb-2 pa-2">
          <div style="text-align:center; padding: 10%;" class="headline">
            <div><i class="fas fa-award fa-3x"></i></div>
            맻등
          </div>
        </div>
      </v-flex>
      <v-flex sm4 pl-10 pr-10>
        <div class="card mb-2 pa-2">
          <div style="text-align:center; padding: 10%;" class="headline">
            <div><i class="fab fa-youtube fa-3x"></i></div>
            {{ this.companyCount }}
          </div>
        </div>
      </v-flex>
      <v-flex sm4 pl-10 pr-10>
        <div class="card mb-2 pa-2">
          <div style="text-align:center; padding: 10%;" class="headline">
            <div><i class="far fa-clock fa-3x"></i></div>
            {{ this.companyTime }}
          </div>
        </div>
      </v-flex>
    </v-layout>
    <v-row>
      <v-col cols="6">
        <div class="chart-title">스크랩 채널 비교</div>
        <div class="card ">
          <ScrapChannelChart />
        </div>
      </v-col>
      <v-col cols="6">
        <div class="chart-title">기업 비교</div>
        <div class="card">
          <CompareExposureChart />
        </div>
      </v-col>
    </v-row>
    <div class="chart-title">영상 추천</div>
    <div class="card ">
      <RecommendVideo />
    </div>
    <div class="chart-title">유투버 추천</div>
    <div class="card ">
      <RecommendChannel />
    </div>
  </div>
</template>

<script>
import ScrapChannelChart from '@/components/ChartComponents/ScrapChannelChart.vue'
import CompareExposureChart from '@/components/ChartComponents/CompareExposureChart.vue'
import RecommendVideo from '@/components/CompanyAnalysisComponents/RecommendVideo.vue'
import RecommendChannel from '@/components/CompanyAnalysisComponents/RecommendChannel.vue'

import { mapActions, mapState } from 'vuex'
const companyStore = 'companyStore'

export default {
  name: 'MyAnalysis',
  data() {
    return {}
  },
  components: {
    RecommendVideo,
    ScrapChannelChart,
    CompareExposureChart,
    RecommendChannel
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

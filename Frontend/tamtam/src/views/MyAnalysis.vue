<template>
  <div>
    <div class="card " style="margin-top:8px;">
      <v-row class="mx-2">
        <v-col cols="6">
          <div style="text-align:center; padding-top: 15%;">
            <div class="headline">맻등?</div>
            <div class="headline">총 영상수 : {{ this.companyCount }}</div>
            <div class="headline">총시간 : {{ this.companyTime }}</div>
          </div>
        </v-col>
        <v-col cols="6">
          <!-- compare -->
          <CompareExposureChart />
        </v-col>
      </v-row>
    </div>
    <!-- <ContactChannel></ContactChannel> -->
    <div class="card component">
      <div class="chart-title">스크랩한 채널 비교</div>
      <v-divider></v-divider>
      <ScrapChannelChart style="padding:50px;" />
    </div>
    <ReferenceVideo class="component"></ReferenceVideo>
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

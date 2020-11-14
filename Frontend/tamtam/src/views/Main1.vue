<template>
  <div class="grid-container">
    <!-- 개별카드 -->
    <article class="card all-exposure-chart-card">
      <div class="chart-title">전체 브랜드 노출 순위</div>
      <v-divider></v-divider>
      <AllExposureChart />
    </article>

    <article class="ind-exposure-chart-section">
      <div class="chart-title">업계 브랜드 노출 순위</div>
      <div class="chart-body card">
        <IndExposureChart />
      </div>
    </article>

    <!-- 카드 한번에 -->
    <article class="card exposure-charts-section">
      <div class="chart-header">
        <div class="chart-title">브랜드 노출 순위</div>
        <v-divider></v-divider>
      </div>
      <div>
        <p class="chart-subtitle">전체 브랜드 순위</p>
        <AllExposureChartCopy />
      </div>
      <div>
        <p class="chart-subtitle">IT 업계 브랜드 순위</p>
        <IndExposureChartCopy />
      </div>
    </article>

    <article class="card ranking-section-card">
      <div class="card-title">YouTuber</div>
      <div>
        <div class="rank_fr">
          <div class="rank-title">
            <div>구독자순</div>
            <router-link :to="{ name: 'Utuberank', params: { subject: 'subscribes' } }">더 보기</router-link>
          </div>
          <div class="rank">
            <v-card v-for="(subscribe, i) in subscribeData" :key="i" class="mx-auto mb-2" max-width="344" outlined>
              <v-list-item three-line>
                <img :src="subscribe.channel_img" width="80px" />
                <v-list-item-content>
                  <router-link
                    :to="{ name: 'Channel', params: { channelId: subscribe.channel_youtube_id } }"
                    class="overline mb-4 headline"
                  >
                    {{ subscribe.channel_name }}
                  </router-link>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </div>
        </div>
      </div>
      <div>
        <div class="rank_fr">
          <div class="rank-title">
            <div>구독자순</div>
            <router-link :to="{ name: 'Utuberank', params: { subject: 'avgviews' } }">더 보기</router-link>
          </div>

          <div class="rank">
            <v-card v-for="(view, i) in viewsData" :key="i" class="mx-auto mt-2" max-width="344" outlined>
              <v-list-item three-line>
                <img :src="view.channel_img" width="80px" />
                <v-list-item-content>
                  <router-link
                    :to="{ name: 'Channel', params: { channelId: view.channel_youtube_id } }"
                    class="overline mb-4"
                  >
                    {{ view.channel_name }}
                  </router-link>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import Chart from 'chart.js'
import { mapState, mapActions } from 'vuex'
import AllExposureChart from '@/components/ChartComponents/AllExposureChart.vue'
import IndExposureChart from '@/components/ChartComponents/IndExposureChart.vue'
import AllExposureChartCopy from '@/components/ChartComponents/AllExposureChartCopy.vue'
import IndExposureChartCopy from '@/components/ChartComponents/IndExposureChartCopy.vue'

const wholeStore = 'wholeStore'

export default {
  name: 'Main1',
  components: {
    AllExposureChart,
    IndExposureChart,
    AllExposureChartCopy,
    IndExposureChartCopy
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(wholeStore, ['subscribeData', 'viewsData'])
  },
  methods: {
    ...mapActions(wholeStore, ['getChannel']),
    createChart(charId, chartData) {
      const ctx = document.getElementById(charId)
      const newChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
      return newChart
    }
  },
  created() {},
  mounted() {
    this.getChannel()
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/Main/main1.scss';
@import '@/scss/charts.scss';
</style>

<template>
  <div>
    <v-carousel cycle hide-delimiters light height="100%">
      <v-carousel-item v-for="i in len" :key="i">
        <v-layout row>
          <v-flex sm4 v-for="j in 3" :key="j" pl-4 pr-4>
            <v-hover>
              <div
                class="card "
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 5 : 30}`"
                v-if="companyRecommendChannel[(i - 1) * 3 + (j - 1)]"
                outlined
              >
                <a
                  style="color: black"
                  @click="moveChannelDetail(companyRecommendChannel[(i - 1) * 3 + (j - 1)].channel._id)"
                >
                  <div class="data mb-8 pa-8" style="text-align:center;">
                    <v-flex style="margin-top:8px;">
                      <v-avatar size="100">
                        <img alt="user" :src="companyRecommendChannel[(i - 1) * 3 + (j - 1)].channel.channel_img" />
                      </v-avatar>
                    </v-flex>
                    <v-flex style="overflow-y: auto; height:100px">
                      <h2 style="margin-top:40px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                        {{ companyRecommendChannel[(i - 1) * 3 + (j - 1)].channel.channel_name }}
                      </h2>
                      <div class="overline mb-1" outlined>
                        {{ companyRecommendChannel[(i - 1) * 3 + (j - 1)].channel.channel_category }}
                      </div>
                    </v-flex>
                    <v-flex style="margin-top:40px;">
                      <div>구독자수 {{ companyRecommendChannel[(i - 1) * 3 + (j - 1)].channel.channel_subscribe }}</div>
                      <div>영상수 {{ companyRecommendChannel[(i - 1) * 3 + (j - 1)].channel.channel_video_cnt }}</div>
                      <div>
                        평균영상시청수 {{ companyRecommendChannel[(i - 1) * 3 + (j - 1)].channel.channel_avg_views }}
                      </div>
                    </v-flex>
                  </div>
                </a>
              </div>
            </v-hover>
          </v-flex>
        </v-layout>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import router from '@/router'
const channelStore = 'channelStore'

export default {
  data: () => ({
    len: null
  }),
  async created() {
    await this.getCompanyRecommendChannel()
    this.len = parseInt(this.companyRecommendChannel.length / 3)
    if (this.companyRecommendChannel.length % 3 !== 0) {
      this.len += 1
    }
  },
  computed: {
    ...mapState(channelStore, ['companyRecommendChannel'])
  },
  methods: {
    ...mapActions(channelStore, ['getCompanyRecommendChannel']),
    moveChannelDetail(channerId) {
      router.push({ name: 'Channel', params: { channelId: channerId } })
    }
  }
}
</script>

<style scoped>
.data {
  /* the other rules */
  transition: all 0.6s;
}
.data:hover {
  transform: scale(1.1);
}
</style>

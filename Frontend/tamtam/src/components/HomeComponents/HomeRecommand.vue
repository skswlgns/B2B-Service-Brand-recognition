<template>
  <div>
    <v-carousel cycle hide-delimiters light height="100%">
      <v-carousel-item v-for="i in pageNumber" :key="i">
        <v-layout row>
          <v-flex sm3 v-for="j in cardNumber" :key="j" pl-4 pr-4>
            <div
              class="card "
              slot-scope="{ hover }"
              :class="`elevation-${hover ? cardNumber : 30}`"
              v-if="homeRecommandChannels[(i - 1) * cardNumber + (j - 1)]"
              outlined
            >
              <a
                style="color: black"
                @click="moveChannelDetail(homeRecommandChannels[(i - 1) * cardNumber + (j - 1)]._id)"
              >
                <div class="data mb-8 pa-8" style="text-align:center;">
                  <v-flex style="margin-top:8px;">
                    <v-hover>
                      <v-avatar size="100">
                        <img alt="user" :src="homeRecommandChannels[(i - 1) * cardNumber + (j - 1)].channel_img" />
                      </v-avatar>
                    </v-hover>
                  </v-flex>
                  <v-flex style="overflow-y: auto; height:100px">
                    <h2 style="margin-top:40px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                      {{ homeRecommandChannels[(i - 1) * cardNumber + (j - 1)].channel_name }}
                    </h2>
                    <div class="overline mb-1" outlined>
                      {{ homeRecommandChannels[(i - 1) * cardNumber + (j - 1)].channel_category }}
                    </div>
                  </v-flex>
                  <v-flex style="margin-top:40px;">
                    <div>구독자수 {{ homeRecommandChannels[(i - 1) * cardNumber + (j - 1)].channel_subscribe }}</div>
                    <div>영상수 {{ homeRecommandChannels[(i - 1) * cardNumber + (j - 1)].channel_video_cnt }}</div>
                    <div>
                      평균영상시청수 {{ homeRecommandChannels[(i - 1) * cardNumber + (j - 1)].channel_avg_views }}
                    </div>
                  </v-flex>
                </div>
              </a>
            </div>
          </v-flex>
        </v-layout>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import router from '@/router'

export default {
  data: () => ({
    pageNumber: 0,
    cardNumber: 5
  }),
  async created() {
    // this.init()
    await this.getHomeRecommandChannels()
    this.pageNumber = parseInt(this.homeRecommandChannels.length / 5)
    if (this.homeRecommandChannels.length % 5 !== 0) {
      this.pageNumber += 1
    }
  },
  computed: {
    ...mapState('homeStore', ['homeRecommandChannels'])
  },
  methods: {
    ...mapActions('homeStore', ['getHomeRecommandChannels']),
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

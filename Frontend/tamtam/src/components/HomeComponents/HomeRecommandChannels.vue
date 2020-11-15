<template>
  <div>
    <v-carousel cycle hide-delimiters show-arrows-on-hover height="100%">
      <v-carousel-item v-for="pageIndex in pageNumber" :key="pageIndex">
        <v-layout row>
          <v-flex sm4 v-for="cardIndex in cardNumber" :key="cardIndex" pl-5 pr-5>
            <div v-if="homeRecommandChannels[(pageIndex - 1) * cardNumber + (cardIndex - 1)]">
              <div class="data pa-2" style="text-align:center;">
                <a
                  style="color: black"
                  @click="
                    moveChannelDetail(
                      homeRecommandChannels[(pageIndex - 1) * cardNumber + (cardIndex - 1)].channel_youtube_id
                    )
                  "
                >
                  <v-flex style="margin-bottom:8px;">
                    <v-avatar size="80">
                      <img
                        alt="user"
                        :src="homeRecommandChannels[(pageIndex - 1) * cardNumber + (cardIndex - 1)].channel_img"
                      />
                    </v-avatar>
                  </v-flex>
                  <v-flex>
                    <div class="data-title">
                      {{ homeRecommandChannels[(pageIndex - 1) * cardNumber + (cardIndex - 1)].channel_name }}
                    </div>
                    <div class="data-subtitle">
                      {{ homeRecommandChannels[(pageIndex - 1) * cardNumber + (cardIndex - 1)].channel_category }}
                    </div>
                  </v-flex>
                  <v-flex style="margin-top:8px;">
                    <div class="data-subtitle">
                      구독자
                      {{
                        subScribeCnt(
                          homeRecommandChannels[(pageIndex - 1) * cardNumber + (cardIndex - 1)].channel_subscribe
                        )
                      }}
                    </div>
                    <div class="data-subtitle">
                      평균시청
                      {{
                        videoAvgCnt(
                          homeRecommandChannels[(pageIndex - 1) * cardNumber + (cardIndex - 1)].channel_avg_views
                        )
                      }}
                    </div>
                  </v-flex>
                </a>
              </div>
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
    cardNumber: 3
  }),
  async created() {
    // this.init()
    await this.getHomeRecommandChannels()
    this.pageNumber = parseInt(this.homeRecommandChannels.length / this.cardNumber)
    if (this.homeRecommandChannels.length % this.cardNumber !== 0) {
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
    },
    subScribeCnt(count) {
      if (count < 1000) return count + '명'
      else if (count < 10000) {
        count = parseInt(count / 1000)
        return count + '천명'
      } else {
        count = parseInt(count / 10000)
        return count + '만명'
      }
    },
    videoAvgCnt(count) {
      if (count < 1000) return count + '명'
      else if (count < 10000) {
        count = parseInt(count / 1000)
        return count + '천명'
      } else {
        count = parseInt(count / 10000)
        return count + '만명'
      }
    }
  }
}
</script>

<style scoped>
.data {
  /* the other rules */
  transition: all 0.6s;
  border-radius: 8px;
}

.data-title {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.data-subtitle {
  font-size: 12px;
  color: gray;
}

.data:hover {
  /* transform: scale(1.1); */
  background: lightgray;
}
</style>

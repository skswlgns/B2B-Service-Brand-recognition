<template>
  <div>
    <v-carousel cycle hide-delimiters light height="100%">
      <v-carousel-item v-for="pageIndex in pageNumber" :key="pageIndex">
        <v-layout row>
          <v-flex sm3 v-for="cardIndex in cardNumber" :key="cardIndex" pl- pr-10>
            <div v-if="companyRecommendChannel[(pageIndex - 1) * cardNumber + (cardIndex - 1)]">
              <div class="data mb-2 pa-2" style="text-align:center;">
                <a
                  style="color: black"
                  @click="
                    moveChannelDetail(
                      companyRecommendChannel[(pageIndex - 1) * cardNumber + (cardIndex - 1)].channel.channel_youtube_id
                    )
                  "
                >
                  <v-flex style="margin-bottom:8px;">
                    <v-avatar size="80">
                      <img
                        alt="user"
                        :src="
                          companyRecommendChannel[(pageIndex - 1) * cardNumber + (cardIndex - 1)].channel.channel_img
                        "
                      />
                    </v-avatar>
                  </v-flex>
                  <v-flex>
                    <div class="data-title">
                      {{ companyRecommendChannel[(pageIndex - 1) * cardNumber + (cardIndex - 1)].channel.channel_name }}
                    </div>
                    <div class="data-subtitle">
                      {{
                        companyRecommendChannel[(pageIndex - 1) * cardNumber + (cardIndex - 1)].channel.channel_category
                      }}
                    </div>
                  </v-flex>
                  <v-flex style="margin-top:8px;">
                    <div class="data-subtitle">
                      구독자 :
                      {{
                        subScribeCnt(
                          companyRecommendChannel[(pageIndex - 1) * cardNumber + (cardIndex - 1)].channel
                            .channel_subscribe
                        )
                      }}
                    </div>
                    <div></div>
                    <div class="data-subtitle">
                      영상수 :
                      {{
                        videoCnt(
                          companyRecommendChannel[(pageIndex - 1) * cardNumber + (cardIndex - 1)].channel
                            .channel_video_cnt
                        )
                      }}
                    </div>
                    <div class="data-subtitle">
                      평균영상시청수
                      {{
                        videoAvgCnt(
                          companyRecommendChannel[(pageIndex - 1) * cardNumber + (cardIndex - 1)].channel
                            .channel_avg_views
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
const searchStore = 'searchStore'

export default {
  data: () => ({
    pageNumber: null,
    cardNumber: 4
  }),
  async mounted() {
    await this.getCompanyRecommendChannel()
    this.pageNumber = parseInt(this.companyRecommendChannel.length / this.cardNumber)
    if (this.companyRecommendChannel.length % this.cardNumber !== 0) {
      this.pageNumber += 1
    }
  },
  computed: {
    ...mapState(searchStore, ['companyRecommendChannel'])
  },
  methods: {
    ...mapActions(searchStore, ['getCompanyRecommendChannel']),
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
    videoCnt(count) {
      if (count < 1000) return count + '개'
      else if (count < 10000) {
        count = parseInt(count / 1000)
        return count + '천개'
      } else {
        count = parseInt(count / 10000)
        return count + '만개'
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
}
.data:hover {
  transform: scale(1.1);
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
</style>

<template>
  <div>
    <v-carousel cycle hide-delimiters show-arrows-on-hover height="100%">
      <v-carousel-item v-for="pageIndex in pageNumber" :key="pageIndex">
        <v-layout row>
          <v-flex sm4 v-for="cardIndex in cardNumber" :key="cardIndex" pl-2 pr-2>
            <div v-if="homeRecommandVideos[(pageIndex - 1) * cardNumber + (cardIndex - 1)]">
              <div class="data pa-2">
                <a
                  style="color: black"
                  @click="
                    moveChannelDetail(
                      homeRecommandVideos[(pageIndex - 1) * cardNumber + (cardIndex - 1)].video_youtube_id
                    )
                  "
                >
                  <div class="data-body">
                    <v-flex style="margin-bottom:8px;">
                      <div style="height: 100px;">
                        <v-img
                          alt="user"
                          class="data-img"
                          lazy-src="https://picsum.photos/id/11/10/6"
                          :src="homeRecommandVideos[(pageIndex - 1) * cardNumber + (cardIndex - 1)].video_thumbnails"
                        />
                      </div>
                    </v-flex>
                    <v-flex>
                      <div class="data-title">
                        {{ homeRecommandVideos[(pageIndex - 1) * cardNumber + (cardIndex - 1)].video_title }}
                      </div>
                      <div class="data-subtitle">
                        {{
                          homeRecommandVideos[(pageIndex - 1) * cardNumber + (cardIndex - 1)].channel_id.channel_name
                        }}
                      </div>
                    </v-flex>
                    <v-flex>
                      <div class="data-subtitle pb-2">
                        조회수
                        {{ viewsCnt(homeRecommandVideos[(pageIndex - 1) * cardNumber + (cardIndex - 1)].video_views) }}
                      </div>
                    </v-flex>
                  </div>
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
    await this.getHomeRecommandVideos()
    this.pageNumber = parseInt(this.homeRecommandVideos.length / this.cardNumber)
    if (this.homeRecommandVideos.length % this.cardNumber !== 0) {
      this.pageNumber += 1
    }
  },
  computed: {
    ...mapState('homeStore', ['homeRecommandVideos'])
  },
  methods: {
    ...mapActions('homeStore', ['getHomeRecommandVideos']),
    moveChannelDetail(videoId) {
      router.push({ name: 'VideoDetail', params: { video_youtube_id: videoId } })
    },
    viewsCnt(count) {
      if (count < 1000) return count + '회'
      else if (count < 10000) {
        count = parseInt(count / 1000)
        return count + '천회'
      } else {
        count = parseInt(count / 10000)
        return count + '만회'
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
.data-img {
  height: 100%;
  border-radius: 8px 8px 0 0;
}

.data-body {
  transition: all 0.6s;
  border-radius: 8px;
}

.data-body:hover {
  background: lightgray;
}

.data-title {
  font-size: 0.75rem;
  height: 2.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  margin-bottom: 8px;
}

.data-subtitle {
  font-size: 12px;
  color: gray;
}
</style>

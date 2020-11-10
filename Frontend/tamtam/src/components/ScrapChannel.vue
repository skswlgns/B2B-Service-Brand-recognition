<template>
  <div v-if="channel.length === 0">
    <h2>스크랩한 영상이 없습니다..</h2>
  </div>
  <div v-else>
    <div v-for="(Item, index) in channel" :key="index">
      <div class="card mx-auto mb-2 data">
        <v-list-item three-line>
          <a @click="moveChannelDetail(Item.channel_youtube_id)">
            <v-list-item-avatar size="100">
              <img alt="user" :src="Item.channel_img" />
            </v-list-item-avatar>
          </a>
          <v-list-item-content>
            <div class="overline mb-1" outlined>
              카테고리 자리인데..
            </div>
            <a style="color: black" @click="moveChannelDetail(Item.channel_youtube_id)">
              <v-list-item-title class="headline mb-1">
                {{ Item.channel_name }}
              </v-list-item-title>
            </a>
            <div class="overline mb-1" outlined>
              <a @click="moveYoutube(Item.channel_youtube_id)">
                <v-avatar size="30">
                  <img alt="user" src="https://i.pinimg.com/originals/21/22/ee/2122ee7f9df41666d2ff5c634d6a5c2d.png" />
                </v-avatar>
              </a>
            </div>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-subtitle> 구독자수 {{ Item.channel_subscribe }} </v-list-item-subtitle>
            <v-list-item-subtitle> 영상수 {{ Item.channel_video_cnt }} </v-list-item-subtitle>
            <v-list-item-subtitle> 평균영상시청수 {{ Item.channel_avg_views }} </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon color="white" @click="scrapCancel(index)">
              <v-icon color="yellow darken-3">
                mdi-star
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
const searchStore = 'searchStore'
const channelStore = 'channelStore'
export default {
  data: () => ({}),
  created() {
    this.getScrapChannel()
  },
  computed: {
    ...mapState(searchStore, ['channel'])
  },
  methods: {
    ...mapActions(searchStore, ['getScrapChannel']),
    ...mapActions(channelStore, ['scrap']),
    async scrapCancel(index) {
      const answer = confirm('스크랩 취소 하시겠습니까?')
      if (answer) {
        await this.scrap(this.channel[index]._id)
        await this.getScrapChannel()
      }
    },
    // 채널 디테일로 이동할꺼임
    moveChannelDetail(channerId) {
      window.open('https://www.youtube.com/channel/' + channerId)
    },
    moveYoutube(channerId) {
      window.open('https://www.youtube.com/channel/' + channerId)
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

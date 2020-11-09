<template>
  <div v-if="channel.length === 0">
    <h2>스크랩한 영상이 없습니다..</h2>
  </div>
  <div v-else>
    <div v-for="(Item, index) in channel" :key="index">
      <div class="card mx-auto mb-2 data">
        <v-list-item three-line>
          <v-list-item-avatar size="100">
            <img alt="user" :src="Item.channel_img" />
          </v-list-item-avatar>
          <v-list-item-content>
            <div class="overline mb-1" outlined>
              카테고리 자리인데..
            </div>
            <v-list-item-title class="headline mb-1">
              {{ Item.channel_name }}
            </v-list-item-title>
            <div class="overline mb-1" outlined>
              <v-btn icon @click="move(Item.channel_youtube_id)" color="white">
                <v-avatar size="30">
                  <img alt="user" src="https://i.pinimg.com/originals/21/22/ee/2122ee7f9df41666d2ff5c634d6a5c2d.png" />
                </v-avatar>
              </v-btn>
            </div>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-subtitle> 구독자수 {{ Item.channel_subscribe }} </v-list-item-subtitle>
            <v-list-item-subtitle> 영상수 {{ Item.channel_video_cnt }} </v-list-item-subtitle>
            <v-list-item-subtitle> 이메일주소 {{ Item.channel_email }} </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon color="white" @click="change(index)">
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
    async change(index) {
      // 스크랩 취소ㄱㄱ
      const answer = confirm('스크랩 취소 하시겠습니까?')
      if (answer) {
        await this.scrap(this.channel[index]._id)
        await this.getScrapChannel()
      }
    },
    move(channerId) {
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

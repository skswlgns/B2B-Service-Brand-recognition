<template>
  <div>
    <div v-for="(Item, index) in channel" :key="index">
      <div class="card mx-auto mb-2 data">
        <v-list-item two-line>
          <a @click="moveChannelDetail(Item._id)">
            <v-list-item-avatar size="100">
              <img alt="user" :src="Item.channel_img" />
            </v-list-item-avatar>
          </a>
          <v-list-item-content>
            <div class="overline mb-1" outlined>
              {{ Item.channel_category }}
            </div>
            <a style="color: black" @click="moveChannelDetail(Item._id)">
              <v-list-item-title class="headline mb-1">
                {{ Item.channel_name }}
              </v-list-item-title>
            </a>
            <div class="overline mb-1" outlined>
              <v-btn icon @click="moveYoutube(Item.channel_youtube_id)" color="white">
                <v-avatar size="30">
                  <img alt="user" src="https://i.pinimg.com/originals/21/22/ee/2122ee7f9df41666d2ff5c634d6a5c2d.png" />
                </v-avatar>
              </v-btn>
            </div>
          </v-list-item-content>

          <v-list-item-content style="text-align: center; border-right: 1px solid #ebebeb;">
            <v-list-item-subtitle>구독자수</v-list-item-subtitle>
            <v-list-item-title class="v-list-item-title">{{ Item.channel_subscribe }} </v-list-item-title>
          </v-list-item-content>
          <v-list-item-content style="text-align: center; border-right: 1px solid #ebebeb;">
            <v-list-item-subtitle>영상수</v-list-item-subtitle>
            <v-list-item-title class="v-list-item-title">{{ Item.channel_video_cnt }} </v-list-item-title>
          </v-list-item-content>
          <v-list-item-content style="text-align: center">
            <v-list-item-subtitle>영상별 평균 조회수</v-list-item-subtitle>
            <v-list-item-title class="v-list-item-title">{{ Item.channel_avg_views }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import router from '@/router'
const channelStore = 'channelStore'

export default {
  data: () => ({}),
  created() {
    this.searchChannel()
  },
  computed: {
    ...mapState(channelStore, ['channel'])
  },
  methods: {
    ...mapActions(channelStore, ['searchChannel']),
    // 채널 디테일로 이동할꺼임
    moveChannelDetail(channerId) {
      router.push({ name: 'Channel', params: { channelId: channerId } })
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
.v-list-item-title {
  font-weight: 900;
  font-size: 24px;
}
</style>

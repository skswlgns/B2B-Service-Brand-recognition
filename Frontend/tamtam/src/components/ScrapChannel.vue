<template>
  <div class="card" v-if="channel.length === 0">
    <div class="out">
      <div class="in">
        <i class="fa fa-exclamation-triangle fa-3x" aria-hidden="true"></i>
        <div class="out">스크랩한 채널이 없습니다.</div>
      </div>
    </div>
  </div>
  <div v-else class="card">
    <div style="height:48px;">
      <div style="float:left;" class="pa-3">
        스크랩한 채널
      </div>
      <div style="margin-left:70%; display:inline-block;" class="pa-3">
        더 보기
      </div>
    </div>
    <v-row no-gutters>
      <v-col class="pa-2" v-for="i in 4" :key="i" cols="12" sm="3">
        <v-card @click="moveChannelDetail(channel[i - 1]._id)" class="data" outlined tile v-if="channel[i - 1]">
          <div style="padding:5%">
            <v-list-item two-line>
              <a>
                <v-avatar size="50" v-if="channel[i - 1]">
                  <v-img alt="user" :src="channel[i - 1].channel_img" />
                </v-avatar>
              </a>
              <v-list-item-content style="text-align:center;">
                <div>
                  {{ channel[i - 1].channel_name }}
                </div>
                <a style="color: black">
                  <v-list-item-title>
                    {{ channel[i - 1].channel_category }}
                  </v-list-item-title>
                </a>
                <!-- <div>
                  <v-btn icon color="white">
                    <v-avatar size="30">
                      <img
                        alt="user"
                        src="https://i.pinimg.com/originals/21/22/ee/2122ee7f9df41666d2ff5c634d6a5c2d.png"
                      />
                    </v-avatar>
                  </v-btn>
                </div> -->
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import router from '@/router'
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
  transition: all 0.6s;
  top: 0;
}
.data:hover {
  top: -10px;
}
</style>

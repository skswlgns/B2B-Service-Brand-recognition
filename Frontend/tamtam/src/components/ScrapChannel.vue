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
      <div
        @click="moredata()"
        v-if="this.channel.length > 4"
        style="margin-left:70%; display:inline-block;"
        class="pa-3"
      >
        더 보기
      </div>
    </div>
    <v-row no-gutters>
      <v-col class="pa-2" v-for="i in len" :key="i" cols="12" sm="3">
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
export default {
  data: () => ({
    len: 4
  }),
  created() {
    this.getScrapChannel()
  },
  computed: {
    ...mapState(searchStore, ['channel'])
  },
  methods: {
    ...mapActions(searchStore, ['getScrapChannel']),
    moredata() {
      this.len = this.channel.length
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

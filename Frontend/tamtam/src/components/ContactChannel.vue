<template>
  <div v-if="channel.length === 0">
    <h2>스크랩한 영상이 없습니다..</h2>
  </div>
  <div v-else class="card">
    <div class="card-title">
      컨택한 채널
    </div>
    <v-carousel hide-delimiters height="100%">
      <v-carousel-item
        light
        v-for="i in channel.length % 11 !== 0 ? parseInt(channel.length / 11) + 1 : parseInt(channel.length / 11)"
        :key="i"
        style="padding-left:88px;"
      >
        <v-row>
          <v-col v-for="j in 11" :key="j" lg="1">
            <a>
              <v-avatar size="80" class="data" v-if="channel[(i - 1) * 11 + (j - 1)]">
                <v-img
                  @click="moveChannelDetail(channel[(i - 1) * 11 + (j - 1)]._id)"
                  alt="user"
                  :src="channel[(i - 1) * 11 + (j - 1)].channel_img"
                />
              </v-avatar>
            </a>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
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

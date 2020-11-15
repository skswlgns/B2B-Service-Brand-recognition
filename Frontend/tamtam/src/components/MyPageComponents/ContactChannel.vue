<template>
  <div class="card" v-if="contactChannel.length === 0">
    <div class="out">
      <div class="in">
        <i class="fa fa-exclamation-triangle fa-3x" aria-hidden="true"></i>
        <div class="out">컨택한 채널이 없습니다.</div>
      </div>
    </div>
  </div>
  <div v-else class="card">
    <v-row no-gutters>
      <v-col class="pa-2" v-for="i in len" :key="i" cols="12" sm="3">
        <v-card
          @click="moveChannelDetail(contactChannel[i - 1].channel_youtube_id)"
          class="data"
          outlined
          tile
          v-if="contactChannel[i - 1]"
        >
          <div style="padding:5%">
            <v-list-item two-line>
              <a>
                <v-avatar size="50" v-if="contactChannel[i - 1]">
                  <v-img alt="user" :src="contactChannel[i - 1].channel_img" />
                </v-avatar>
              </a>
              <v-list-item-content style="text-align:center;">
                <div class="data-title">
                  {{ contactChannel[i - 1].channel_name }}
                </div>
                <div class="data-subtitle">구독자 {{ subScribeCnt(contactChannel[i - 1].channel_subscribe) }}</div>
                <div class="data-subtitle">영상 {{ videoCnt(contactChannel[i - 1].channel_video_cnt) }}</div>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <div v-if="open" style="height:48px;">
      <div style="float:left;" class="pa-3"></div>
      <div v-if="show" align="right" class="pa-3">
        <div @click="moredata()" class="cursor">
          더 보기
        </div>
      </div>
      <div v-else-if="!show" align="right" class="pa-3">
        <div @click="moredata()" class="cursor">
          접기
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import router from '@/router'
const searchStore = 'searchStore'
export default {
  data: () => ({
    len: 4,
    show: false,
    open: false
  }),
  async created() {
    this.getContactChannel()
    if (this.contactChannel.length > 4) {
      this.show = true
      this.open = true
    }
  },
  computed: {
    ...mapState(searchStore, ['contactChannel'])
  },
  methods: {
    ...mapActions(searchStore, ['getContactChannel']),
    moredata() {
      if (this.show) {
        this.len = this.contactChannel.length
        this.show = false
      } else {
        this.len = 4
        this.show = true
      }
    },
    // 채널 디테일로 이동할꺼임
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
  transition: all 0.6s;
  top: 0;
}
.data:hover {
  top: -10px;
}
.cursor {
  cursor: pointer;
  color: rgb(92, 107, 192);
  font-weight: bold;
}
.data-title {
  font-size: 12px;
}
.data-subtitle {
  font-size: 12px;
  color: gray;
}
</style>

<template>
  <div class="card" v-if="channel.length === 0">
    <div class="out">
      <div class="in">
        <i class="fa fa-exclamation-triangle fa-3x" aria-hidden="true"></i>
        <div class="out">검색된 채널이 없습니다.</div>
      </div>
    </div>
  </div>
  <div v-else class="card">
    <div style="height:48px;">
      <div style="float:left;" class="pa-3">
        채널
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
    <div v-if="this.channel.length > 4" style="height:48px;">
      <div style="float:left;" class="pa-3"></div>
      <div align="right" class="pa-3">
        <div @click="moredata()" class="cursor">
          더 보기
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import router from '@/router'
const searchStore = 'searchStore'

export default {
  data: () => ({
    len: 4
  }),
  created() {},
  computed: {
    ...mapState(searchStore, ['channel'])
  },
  methods: {
    ...mapGetters(searchStore, ['getChannel']),
    moredata() {
      this.len = this.channel.length
    },
    moveChannelDetail(channerId) {
      router.push({ name: 'Channel', params: { channelId: channerId } })
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

<template>
  <div class="card" v-if="channel.length === 0">
    <div class="out">
      <div class="in">
        <i class="fa fa-exclamation-triangle fa-3x" aria-hidden="true"></i>
        <div class="out">채널이 없습니다.</div>
      </div>
    </div>
  </div>
  <div v-else class="card">
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
import { mapGetters, mapState } from 'vuex'
import router from '@/router'
const searchStore = 'searchStore'

export default {
  data: () => ({}),
  created() {},
  computed: {
    ...mapState(searchStore, ['channel'])
  },
  methods: {
    ...mapGetters(searchStore, ['getChannel']),
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

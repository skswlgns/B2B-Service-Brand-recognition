<template>
  <div class="card">
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
                  @click="detail((i - 1) * 11 + (j - 1))"
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
const searchStore = 'searchStore'

export default {
  data: () => ({}),
  created() {},
  computed: {
    ...mapState(searchStore, ['channel'])
  },
  methods: {
    ...mapGetters(searchStore, ['getChannel']),
    detail(idx) {
      // alert(idx)
      window.open('https://www.youtube.com/channel/' + this.channel[idx].channel_youtube_id)
    }
  }
}
</script>

<style scoped>
.data {
  /* opacity: 0.7; */
  transition: all 0.6s;
  top: 0;
}
.data:hover {
  top: -10px;
  /* opacity: 1; */
}
</style>

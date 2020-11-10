<template>
  <div>
    <v-carousel cycle hide-delimiters light height="100%">
      <v-carousel-item v-for="i in len" :key="i">
        <v-layout row>
          <v-flex sm4 v-for="j in 3" :key="j" pl-4 pr-4>
            <v-hover>
              <div
                class="card "
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 5 : 30}`"
                v-if="channel[(i - 1) * 3 + (j - 1)]"
                outlined
              >
                <div class="data mb-8 pa-8" style="text-align:center;">
                  <v-flex style="margin-top:8px;">
                    <v-avatar size="100">
                      <img alt="user" :src="channel[(i - 1) * 3 + (j - 1)].channel_img" />
                    </v-avatar>
                  </v-flex>
                  <v-flex style="overflow-y: auto; height:100px">
                    <h2 style="margin-top:40px;">
                      {{ channel[(i - 1) * 3 + (j - 1)].channel_name }}
                    </h2>
                  </v-flex>
                  <v-flex style="margin-top:40px;">
                    <div>
                      {{ channel[(i - 1) * 3 + (j - 1)].channel_subscribe }}
                    </div>
                    <div>{{ channel[(i - 1) * 3 + (j - 1)].channel_video_cnt }}</div>
                    <div>{{ channel[(i - 1) * 3 + (j - 1)].channel_avg_views }}</div>
                  </v-flex>
                </div>
              </div>
            </v-hover>
          </v-flex>
        </v-layout>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
const channelStore = 'channelStore'

export default {
  data: () => ({
    len: 3
  }),
  created() {
    // this.init()
    this.searchChannel()
  },
  computed: {
    ...mapState(channelStore, ['channel'])
  },
  methods: {
    ...mapActions(channelStore, ['searchChannel']),
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

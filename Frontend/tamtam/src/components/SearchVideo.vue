<template>
  <div class="card">
    <v-carousel hide-delimiters height="100%">
      <v-carousel-item
        light
        v-for="i in video.length % 3 !== 0 ? parseInt(video.length / 3) + 1 : parseInt(video.length / 3)"
        :key="i"
      >
        <v-row>
          <v-col v-for="j in 3" :key="j" sm="4">
            <v-card flat tile class="data" v-if="video[(i - 1) * 3 + (j - 1)]">
              <v-img alt="user" :src="video[(i - 1) * 3 + (j - 1)].video_thumbnails" />
              <v-card-actions>
                <h2
                  style="padding: 5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;"
                  v-html="video[(i - 1) * 3 + (j - 1)].video_title"
                ></h2>
                <v-spacer></v-spacer>

                <v-btn icon @click="show = !show">
                  <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="show">
                  <v-card-text>
                    통계그래프 장착 예정..
                  </v-card-text>
                </div>
              </v-expand-transition>
              <!-- <h2
                  style="padding: 5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;"
                ></h2> -->
            </v-card>
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
  data: () => ({
    videos: [],
    len: 0,
    show: false
  }),
  created() {
    // this.videos = this.getVideo()
    // alert(this.videos.length)
    // this.len = parseInt(this.videos.length / 3)
    // if (this.videos.length % 3 !== 0) {
    //   this.len += 1
    // }
  },
  computed: {
    ...mapState(searchStore, ['video'])
  },
  methods: {
    ...mapGetters(searchStore, ['getVideo'])
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

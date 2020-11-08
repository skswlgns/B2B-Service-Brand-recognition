<template>
  <div class="card">
    <v-carousel hide-delimiters height="100%">
      <v-carousel-item light v-for="i in len" :key="i">
        <v-row>
          <v-col v-for="j in 3" :key="j" sm="4">
            <v-card class="data" v-if="videos[(i - 1) * 3 + (j - 1)]">
              <v-img alt="user" :src="videos[(i - 1) * 3 + (j - 1)].snippet.thumbnails.medium.url" />
              <v-card-actions>
                <h2
                  style="padding: 5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;"
                  v-html="videos[(i - 1) * 3 + (j - 1)].snippet.title"
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
import axios from 'axios'
import { mapGetters } from 'vuex'
const searchStore = 'searchStore'
export default {
  data: () => ({
    videos: [],
    len: 0,
    show: false,
    text: ''
  }),
  created() {
    this.text = this.getsearchText()
    this.init()
  },
  methods: {
    ...mapGetters(searchStore, ['getsearchText']),

    init() {
      // 백엔드 연결
      // const url = 'http://localhost:3000/api/video/5f9e7736c24b5734cc5fe5e1';
      const url =
        'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBOoucBKPmX2PzsuBbhyIxaQki54e4Fh_g&part=snippet&regionCode=KR&maxResults=6&type=video&q=' +
        this.text
      axios.get(url).then(res => {
        this.videos = res.data.items
        this.len = parseInt(this.videos.length / 3)
        if (this.videos.length % 3 !== 0) {
          this.len += 1
        }
      })
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

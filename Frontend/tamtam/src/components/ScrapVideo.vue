<template>
  <div style="padding-top: 16px;">
    <v-card flat tile style="padding:8px;">
      <h2 style="font-size:16px; padding:8px;">
        스크랩한 영상
      </h2>
      <v-carousel hide-delimiters height="100%">
        <v-carousel-item light v-for="i in len" :key="i">
          <v-row>
            <v-col v-for="j in 3" :key="j" sm="4">
              <v-card tile flat class="card" v-if="videos[(i - 1) * 3 + (j - 1)]">
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
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    videos: [],
    len: 0,
    title: '',
    show: false
  }),
  created() {
    this.title = '싸피'
    this.init()
  },
  methods: {
    init() {
      // 백엔드 연결
      // const url = 'http://localhost:3000/api/video/5f9e7736c24b5734cc5fe5e1';
      const url =
        'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBQbAtGm7FHazDtqEv7xsyyDmU31k-kzyI&part=snippet&regionCode=KR&maxResults=50&type=video&q=' +
        this.title
      axios.get(url).then(res => {
        this.videos = res.data.items
        this.len = parseInt(this.videos.length / 4)
        if (this.videos.length % 4 !== 0) {
          this.len += 1
        }
      })
    }
  }
}
</script>

<style scoped>
.card {
  /* opacity: 0.7; */
  transition: all 0.6s;
  top: 0;
}
.card:hover {
  top: -10px;
  /* opacity: 1; */
}
</style>

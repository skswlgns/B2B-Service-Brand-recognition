<template>
  <div class="card">
    <v-carousel hide-delimiters height="100%">
      <v-carousel-item light v-for="i in len" :key="i" style="padding-left:88px;">
        <v-row>
          <v-col v-for="j in 11" :key="j" lg="1">
            <a>
              <v-avatar size="80" class="data" v-if="videos[(i - 1) * 11 + (j - 1)]">
                <v-img alt="user" :src="videos[(i - 1) * 11 + (j - 1)].snippet.thumbnails.medium.url" />
              </v-avatar>
            </a>
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
    link: 'https://www.youtube.com/channel/',
    text: ''
  }),
  created() {
    this.text = this.getsearchText()
    this.init()
  },
  methods: {
    ...mapGetters(searchStore, ['getsearchText']),

    init() {
      // const title = this.getsearchText()
      // 백엔드 연결
      // const url = 'http://localhost:3000/api/video/5f9e7736c24b5734cc5fe5e1';
      const url =
        'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBOoucBKPmX2PzsuBbhyIxaQki54e4Fh_g&part=snippet&regionCode=KR&maxResults=50&type=channel&q=' +
        this.title
      axios.get(url).then(res => {
        this.videos = res.data.items
        this.len = parseInt(this.videos.length / 11)
        if (this.videos.length % 11 !== 0) {
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

<template>
  <div class="card">
    <h2 style="font-size:16px; padding:8px;">
      영상 검색결과
    </h2>
    <v-carousel hide-delimiters height="100%">
      <v-carousel-item light v-for="i in len" :key="i">
        <v-row>
          <v-col v-for="j in 4" :key="j" sm="3">
            <v-card tile flat link class="data" v-if="videos[(i - 1) * 4 + (j - 1)]">
              <v-img alt="user" :src="videos[(i - 1) * 4 + (j - 1)].snippet.thumbnails.medium.url" />
              <h2
                style="padding: 5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;"
                v-html="videos[(i - 1) * 4 + (j - 1)].snippet.title"
              ></h2>
            </v-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    videos: [],
    len: 0
  }),
  props: ['title'],
  created() {
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

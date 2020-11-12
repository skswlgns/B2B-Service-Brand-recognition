<template>
  <div>
    <v-row>
      <v-col v-for="(video, i) in videoData" :key="i" cols="3">
        {{ video.video_record }}
        <v-card class="mx-auto">
          <img :src="video.video_thumbnails" />
          <v-card-text></v-card-text>
          <v-spacer></v-spacer>
        </v-card>
      </v-col>
    </v-row>
    <infinite-loading class="" @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import axios from 'axios'
import cookies from 'vue-cookies'

const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL

export default {
  name: 'Video',
  data() {
    return {
      config: {
        headers: {
          token: cookies.get('token'),
          limit: 0
        }
      },
      count: {
        limit: 0
      },
      videoData: [],
      Id: cookies.get('channelId')
    }
  },
  components: {
    InfiniteLoading
  },
  methods: {
    infiniteHandler($state) {
      axios
        .get(`${API_SERVER_URL}/video/videos/${this.Id}`, this.config)
        .then(response => {
          setTimeout(() => {
            if (response.data.length) {
              this.videoData = this.videoData.concat(response.data)
              $state.loaded()
              this.config.headers.limit += 4
              if (this.videoData.length / 4 === 0) {
                $state.complete()
              }
            } else {
              $state.complete()
            }
          }, 1000)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
@import '../scss/channel.scss';
</style>

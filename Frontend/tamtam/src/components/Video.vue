<template>
  <div>
    {{ channelId }}
    <v-row>
      <v-col v-for="(video, i) in videoData" :key="i" cols="3">
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
const config = {
  headers: {
    token: cookies.get('token')
  }
}

export default {
  name: 'Video',
  data() {
    return {
      limit: 0,
      videoData: [],
      Id: ''
    }
  },
  components: {
    InfiniteLoading
  },
  props: {
    channelId: {
      type: String
    }
  },
  methods: {
    infiniteHandler($state) {
      config.headers.company_id = cookies.get('companyId')
      axios.get(`${API_SERVER_URL}/video/videos/${this.Id}`, this.limit, config).then(response => {
        const video = this.videoData.concat(response.data)
        this.videoData = video
      })
    }
  },
  mounted() {
    console.log(this.channelId)
    this.Id = this.channelId
  }
}
</script>

<style></style>

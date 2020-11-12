<template>
  <div class="card" v-if="video.length === 0">
    <div class="out">
      <div class="in">
        <i class="fa fa-exclamation-triangle fa-3x" aria-hidden="true"></i>
        <div class="out">스크랩한 영상이 없습니다.</div>
      </div>
    </div>
  </div>
  <div v-else class="card">
    <div style="height:48px;">
      <div style="float:left;" class="pa-3">
        스크랩한 영상
      </div>
      <div align="right" @click="moredata()" v-if="this.video.length > 3" class="pa-3">
        더 보기
      </div>
    </div>
    <v-row no-gutters>
      <v-col class="pa-2" v-for="i in len" :key="i" cols="12" sm="4">
        <v-card class="data" outlined tile v-if="video[i - 1]">
          <a @click="moveVideoDetail(video[i - 1].video_youtube_id)">
            <v-img alt="user" :src="video[i - 1].video_thumbnails" />
          </a>
          <v-card-actions>
            <h2
              style="padding: 5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;"
              v-html="video[i - 1].video_title"
            ></h2>
          </v-card-actions>
          <v-expand-transition>
            <v-card-text>
              브랜드 노출 영상 퍼센트
            </v-card-text>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import router from '@/router'
const searchStore = 'searchStore'
export default {
  data: () => ({
    len: 3
  }),
  created() {
    this.getScrapVideo()
  },
  computed: {
    ...mapState(searchStore, ['video'])
  },
  methods: {
    ...mapActions(searchStore, ['getScrapVideo']),
    moredata() {
      this.len = this.video.length
    },
    moveVideoDetail(id) {
      router.push({ name: 'VideoDetail', params: { video_youtube_id: id } })
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

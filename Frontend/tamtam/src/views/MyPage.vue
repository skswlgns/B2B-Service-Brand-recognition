<template>
  <v-app>
    <div>
      <div class="card-title">
        스크랩한 채널
      </div>
      <ScrapChannel></ScrapChannel>
      <!-- <ScrapVideo style="overflow-y: auto;"></ScrapVideo> -->
      <div class="card-title">
        스크랩한 영상
      </div>
      <ScrapVideo></ScrapVideo>
    </div>
  </v-app>
</template>

<script>
import ScrapChannel from '@/components/ScrapChannel.vue'
import ScrapVideo from '@/components/ScrapVideo.vue'

export default {
  name: 'Search',
  components: {
    ScrapVideo,
    ScrapChannel
  }
}
</script>

<template>
  <v-app>
    <div>
      <!-- <h1 style="font-size:24px; padding-top:24px; padding-bottom: 8px;">
        '{{ this.searchText }}'(으)로 검색한 결과입니다.
      </h1> -->
      <!-- <SearchChannel v-bind:title="this.searchText"></SearchChannel> -->
      <ScrapChannel></ScrapChannel>
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

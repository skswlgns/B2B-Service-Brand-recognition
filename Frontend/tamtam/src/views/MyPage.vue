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
      <div class="card-title">관련 유튜버 랭킹</div>
      <Ranking></Ranking>
      <div class="card-title">유투버 추천</div>
      <Recommend></Recommend>
    </div>
  </v-app>
</template>

<script>
import ScrapChannel from '@/components/ScrapChannel.vue'
import ScrapVideo from '@/components/ScrapVideo.vue'
import Ranking from '@/components/Ranking.vue'
import Recommend from '@/components/Recommend.vue'
export default {
  name: 'Search',
  components: {
    ScrapVideo,
    ScrapChannel,
    Ranking,
    Recommend
  }
}
</script>

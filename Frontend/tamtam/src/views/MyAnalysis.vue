<template>
  <div>
    <div class="card-title">유튜버 랭킹</div>
    <Ranking></Ranking>
    <div class="card-title">인기 유투버 추천</div>
    <Recommend></Recommend>
  </div>
</template>

<script>
import Ranking from '@/components/Ranking.vue'
import Recommend from '@/components/Recommend.vue'

export default {
  name: 'MyAnalysis',
  components: {
    Ranking,
    Recommend
  }
}
</script>

<template>
  <v-app>
    <div>
      <Ranking></Ranking>
      <Recommend></Recommend>
    </div>
  </v-app>
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

<style lang="scss">
@import '@/scss/reset.scss';
@import '@/scss/nav.scss';
</style>

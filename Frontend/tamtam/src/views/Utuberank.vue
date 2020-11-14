<template>
  <div>
    <Ranking />
  </div>
</template>

<script>
import Ranking from '../components/Ranking.vue'

export default {
  name: 'Utuberank',
  data() {
    return {}
  },
  components: {
    Ranking
  },
  props: {
    subject: {
      type: String
    }
  }
}
</script>

<style></style>

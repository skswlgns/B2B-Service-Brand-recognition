<template>
  <div class="home">
    <v-card class="mx-auto"
    max-width="650"
    outlined>
    <Ranking/>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
import Ranking from "@/components/Ranking.vue";
export default {
  name: "Home",
  components: {
    Ranking
  }
};
</script>

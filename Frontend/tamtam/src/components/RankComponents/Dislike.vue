<template>
  <div>
    <v-list-item-subtitle>싫어요 수</v-list-item-subtitle>
    <v-list-item-title class="v-list-item-title" v-if="dislike < 1000">{{ dislike }} </v-list-item-title>
    <v-list-item-title class="v-list-item-title" v-else-if="dislike < 10000"
      >{{ (dislike / 1000).toFixed(1) }}천
    </v-list-item-title>
    <v-list-item-title class="v-list-item-title" v-else>{{ (dislike / 10000).toFixed(1) }}만 </v-list-item-title>
  </div>
</template>

<script>
export default {
  name: 'Dislike',
  props: {
    dislike: {
      type: Number
    }
  }
}
</script>

<style></style>

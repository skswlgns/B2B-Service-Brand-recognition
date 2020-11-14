<template>
  <div>
    <v-list-item-subtitle>좋아요 수</v-list-item-subtitle>
    <v-list-item-title class="v-list-item-title" v-if="like < 1000">{{ like }} </v-list-item-title>
    <v-list-item-title class="v-list-item-title" v-else-if="like < 10000"
      >{{ (like / 1000).toFixed(1) }}천
    </v-list-item-title>
    <v-list-item-title class="v-list-item-title" v-else>{{ (like / 10000).toFixed(1) }}만 </v-list-item-title>
  </div>
</template>

<script>
export default {
  name: 'Like',
  props: {
    like: {
      type: String
    }
  }
}
</script>

<style></style>

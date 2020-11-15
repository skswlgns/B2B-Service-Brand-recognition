<template>
  <div>
    <v-list-item-subtitle>조회수</v-list-item-subtitle>
    <v-list-item-title class="v-list-item-title" v-if="view < 1000">{{ view }} </v-list-item-title>
    <v-list-item-title class="v-list-item-title" v-else-if="view < 10000"
      >{{ (view / 1000).toFixed(1) }}천
    </v-list-item-title>
    <v-list-item-title class="v-list-item-title" v-else>{{ (view / 10000).toFixed(1) }}만 </v-list-item-title>
  </div>
</template>

<script>
export default {
  name: 'Viewcount',
  props: {
    view: {
      type: Number
    }
  }
}
</script>

<style></style>

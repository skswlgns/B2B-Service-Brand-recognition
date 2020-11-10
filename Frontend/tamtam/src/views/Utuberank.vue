<template>
  <div>
    <v-card v-for="(channel, i) in channelData" :key="i" class="mx-auto mb-2" max-width="344" outlined>
      <v-list-item three-line>
        <img :src="channel.channel_img" width="80px" />
        <v-list-item-content>
          <div class="overline mb-4 headline">
            {{ channel.channel_name }}
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Utuberank',
  data() {
    return {}
  }
}
</script>

<style></style>

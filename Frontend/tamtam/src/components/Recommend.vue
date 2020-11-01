<template>
  <div style="padding-top: 88px;">
    <h2 style="text-align:center; font-size:46px;">인기 유투버 추천</h2>
    <v-carousel cycle hide-delimiters light height="100%" >
      <v-carousel-item style="padding:56px" v-for="i in 2" :key="i">
        <v-layout row>
          <v-flex sm4 v-for="j in 3" :key="j" pl-4 pr-4>
            <v-card v-if="selected[(i - 1) * 3 + j]" outlined rounded="">
              <div class="mb-8 pa-8" style="text-align:center;">
                <v-flex style="margin-top:8px;">
                  <v-avatar size="100">
                    <img alt="user" :src="selected[(i - 1) * 3 + j].image" />
                  </v-avatar>
                </v-flex>
                <v-flex style="margin-top:72px;">
                  <h2>
                    {{ selected[(i - 1) * 3 + j].name }}
                  </h2>
                </v-flex>
                <v-flex style="margin-top:40px;">
                  <div>{{ selected[(i - 1) * 3 + j].subscriberCount }}</div>
                  <div>{{ selected[(i - 1) * 3 + j].videoCount }}</div>
                  <div>{{ selected[(i - 1) * 3 + j].viewCount }}</div>
                </v-flex>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    list: [
      "UCdUcjkyZtf-1WJyPPiETF1g",
      "UCZf4ZESHAIuRtZ-eoMSL97A",
      "UCwx6n_4OcLgzAGdty0RWCoA",
      "UC0SoPwEH3idvemSDvKaYgGA",
      "UCp-C7mtkuOw6q8E1Uc2NVpQ",
      "UCYAvG7-sBBztgDtwKil1RTQ",
      "UCFxZimsJ4gupYy7xzmStOcA",
    ],
    Item: {
      channerId: "",
      image: "",
      name: "",
      subscriberCount: "",
      videoCount: "",
      viewCount: "",
    },

    selected: [],
  }),
  created() {
    this.initialize();
  },

  methods: {
    move(channerId) {
      window.open("https://www.youtube.com/channel/" + channerId);
    },
    initialize() {
      for (var id of this.list) {
        var url =
          "https://www.googleapis.com/youtube/v3/channels?key=AIzaSyBQbAtGm7FHazDtqEv7xsyyDmU31k-kzyI&part=snippet, brandingSettings, contentDetails, statistics, topicDetails&id=" +
          id;
        axios.get(url).then((res) => {
          this.Item = [];
          this.Item.channerId = res.data.items[0].id;
          this.Item.image = res.data.items[0].snippet.thumbnails.default.url;
          this.Item.name = res.data.items[0].snippet.title;
          this.Item.subscriberCount =
            res.data.items[0].statistics.subscriberCount;
          this.Item.videoCount = res.data.items[0].statistics.videoCount;
          this.Item.viewCount = res.data.items[0].statistics.viewCount;
          this.selected.push(this.Item);
        });
      }
    },
  },
};
</script>

<style scoped>

</style>
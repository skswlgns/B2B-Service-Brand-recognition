<template>
  <div>
    <div v-for="(Item, index) in selected" :key="index">
      <v-card class="mx-auto" max-width="650" outlined>
        <v-list-item three-line>
          <v-list-item-avatar tile size="80" color="grey">
            <img alt="user" :src="Item.image" />
          </v-list-item-avatar>
          <v-list-item-content>
            <div class="overline mb-4" outlined>
              it/기술/컴퓨터
            </div>
            <v-list-item-title class="headline mb-1">
              {{ Item.name }}
            </v-list-item-title>
            <v-avatar size="30">
                <img alt="user" src="https://i.pinimg.com/originals/21/22/ee/2122ee7f9df41666d2ff5c634d6a5c2d.png"
                @click="move(Item.channerId)"/>
        </v-avatar>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-subtitle>
              구독자수 {{ Item.subscriberCount }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              영상수 {{ Item.videoCount }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              영상시청수 {{ Item.viewCount }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        
      </v-card>
    </div>
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
    move(channerId){
      window.open('https://www.youtube.com/channel/'+channerId);
    },
    initialize() {
      for (var id of this.list) {
        var url =
          "https://www.googleapis.com/youtube/v3/channels?key=AIzaSyBQbAtGm7FHazDtqEv7xsyyDmU31k-kzyI&part=snippet, brandingSettings, contentDetails, statistics, topicDetails&id="
          + id;
        axios.get(url).then((res) => {
          this.Item = [];
          this.Item.channerId = res.data.items[0].id;
          this.Item.image = res.data.items[0].snippet.thumbnails.default.url;
          this.Item.name = res.data.items[0].snippet.title;
          this.Item.subscriberCount = res.data.items[0].statistics.subscriberCount;
          this.Item.videoCount = res.data.items[0].statistics.videoCount;
          this.Item.viewCount = res.data.items[0].statistics.viewCount;
          this.selected.push(this.Item);
        });
      }
    },
  },
};
</script>

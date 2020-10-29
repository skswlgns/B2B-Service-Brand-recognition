<template>
  <div>
    <div>
      <v-card class="mx-auto" max-width="650" outlined>
        <v-list-item two-line>
          <v-list-item-avatar tile size="80" color="grey">
            <img alt="user" :src="this.Item.image" />
          </v-list-item-avatar>
          <v-list-item-content>
            <div class="overline mb-4">
              it/기술/컴퓨터
            </div>
            <v-list-item-title class="headline mb-1">
              {{ this.Item.name }}
            </v-list-item-title>
            <!-- <v-list-item-subtitle
                    >Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle
                    > -->
          </v-list-item-content>
        </v-list-item>
      </v-card>

      <v-card class="mx-auto" max-width="650" outlined>
        <v-list-item three-line>
          <v-list-item-avatar tile size="80" color="grey">
            <img alt="user" :src="this.Item.image" />
          </v-list-item-avatar>
          <v-list-item-content>
            <div class="overline mb-4" outlined>
              it/기술/컴퓨터
            </div>
            <v-list-item-title class="headline mb-1">
              {{ this.Item.name }}
            </v-list-item-title>
            <!-- <v-list-item-subtitle
                    >Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle
                    > -->
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-subtitle>
              구독자수 {{ this.Item.subscriberCount }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              영상수 {{ this.Item.videoCount }}
            </v-list-item-subtitle>

            <v-list-item-subtitle>
              영상시청수 {{ this.Item.viewCount }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>
    <!-- <iframe width="480" height="270" :src="this.video" frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe> -->
  </div>
        
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    Item: {
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
    initialize() {
      var url =
        "https://www.googleapis.com/youtube/v3/channels?key=AIzaSyBQbAtGm7FHazDtqEv7xsyyDmU31k-kzyI&part=snippet, brandingSettings, contentDetails, statistics, topicDetails&id=UCdUcjkyZtf-1WJyPPiETF1g";
      axios.get(url).then((res) => {
        console.log(res.data.items[0]);
        this.Item = [];
        this.Item.image = res.data.items[0].snippet.thumbnails.default.url;
        this.Item.name = res.data.items[0].snippet.title;
        this.Item.subscriberCount =
          res.data.items[0].statistics.subscriberCount;
        this.Item.videoCount = res.data.items[0].statistics.videoCount;
        this.Item.viewCount = res.data.items[0].statistics.viewCount;
        console.log(this.Item);
      });
    },
  },
};
</script>

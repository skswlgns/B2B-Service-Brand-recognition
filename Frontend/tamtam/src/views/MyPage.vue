<template>
  <div>
    <div class="card" style="margin-top:8px;">
      <v-row>
        <v-col cols="6">
          <div class="text-center" style="border-right: 2px solid #ebebeb;">
            <span @click="toggleContact()" class="cursor"><h5>컨택한 채널</h5></span>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="text-center">
            <span @click="toggleScrap()" class="cursor"><h5>스크랩한 채널</h5></span>
          </div>
        </v-col>
      </v-row>
    </div>
    <div v-if="showContact">
      <ContactChannel class="component"></ContactChannel>
    </div>
    <div v-else-if="showScrap">
      <ScrapChannel class="component"></ScrapChannel>
    </div>
    <div>
      <ScrapVideo class="component"></ScrapVideo>
      <div class="card-title">유투버 추천</div>
      <Recommend></Recommend>
    </div>
  </div>
</template>

<script>
import ContactChannel from '@/components/ContactChannel.vue'
import ScrapChannel from '@/components/ScrapChannel.vue'
import ScrapVideo from '@/components/ScrapVideo.vue'
import Recommend from '@/components/Recommend.vue'
import cookies from 'vue-cookies'
export default {
  name: 'Search',
  components: {
    ScrapVideo,
    ScrapChannel,
    Recommend,
    ContactChannel
  },
  data() {
    return {
      company_id: cookies.get('companyId'),
      showContact: true,
      showScrap: false
    }
  },
  methods: {
    toggleContact() {
      this.showContact = true
      this.showScrap = false
    },
    toggleScrap() {
      this.showContact = false
      this.showScrap = true
    }
  }
}
</script>
<style scoped>
.title-img {
  width: 80px;
  height: 114px;
}
.bg {
  background-color: #c0c0c0;
}
.cursor {
  cursor: pointer;
  color: rgb(92, 107, 192);
  font-weight: bold;
}
.cont {
  margin: 0 20%;
}
.component {
  margin-top: 8px;
}
</style>

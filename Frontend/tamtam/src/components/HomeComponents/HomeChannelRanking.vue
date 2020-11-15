<template>
  <div class="ranking-group">
    <div class="ranking-list">
      <div class="ranking-title">
        <span>구독자 Top 5</span>
      </div>
      <v-divider></v-divider>
      <div class="ranking-body">
        <v-list-item class="ranking-item" v-for="(channel, index) in homeSubscribeChannelRanking" :key="index">
          <router-link :to="{ name: 'Channel', params: { channelId: channel._id } }">
            <img :src="channel.channel_img" />
            <div>
              <p class="item-title">{{ channel.channel_name }}</p>
              <p>구독자 {{ subScribeCnt(channel.channel_subscribe) }}</p>
              <p>영상 {{ videoCnt(channel.channel_video_cnt) }}</p>
            </div>
          </router-link>
        </v-list-item>
      </div>
      <div class="ranking-footer">
        <router-link to="/home">더 보기</router-link>
      </div>
    </div>
    <div class="ranking-list">
      <div class="ranking-title">
        <span>평균 조회수 Top 5</span>
      </div>
      <v-divider></v-divider>
      <div class="ranking-body">
        <v-list-item class="ranking-item" v-for="(channel, index) in homeViewsChannelRanking" :key="index">
          <router-link :to="{ name: 'Channel', params: { channelId: channel._id } }">
            <img :src="channel.channel_img" />
            <div>
              <p class="item-title">{{ channel.channel_name }}</p>
              <p>구독자 {{ subScribeCnt(channel.channel_subscribe) }}</p>
              <p>영상 {{ videoCnt(channel.channel_video_cnt) }}</p>
            </div>
          </router-link>
        </v-list-item>
      </div>
      <div class="ranking-footer">
        <router-link to="/home">더 보기</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'HomeChannelRanking',
  data() {
    return {}
  },
  computed: {
    ...mapState('homeStore', ['homeSubscribeChannelRanking', 'homeViewsChannelRanking'])
  },
  methods: {
    ...mapActions('homeStore', ['getChannelRankingData']),
    subScribeCnt(count) {
      if (count < 1000) return count + '명'
      else if (count < 10000) {
        count = parseInt(count / 1000)
        return count + '천명'
      } else {
        count = parseInt(count / 10000)
        return count + '만명'
      }
    },
    videoCnt(count) {
      if (count < 1000) return count + '개'
      else if (count < 10000) {
        count = parseInt(count / 1000)
        return count + '천개'
      } else {
        count = parseInt(count / 10000)
        return count + '만개'
      }
    },
    videoAvgCnt(count) {
      if (count < 1000) return count + '명'
      else if (count < 10000) {
        count = parseInt(count / 1000)
        return count + '천명'
      } else {
        count = parseInt(count / 10000)
        return count + '만명'
      }
    }
  },
  async created() {
    await this.getChannelRankingData()
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/Home/home.scss';
@import '@/scss/charts.scss';
</style>

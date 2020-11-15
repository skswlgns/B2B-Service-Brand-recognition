<template>
  <div class="today-recommand" @click="moveChannelDetail(tamtamRecommandChannel[0].channel_youtube_id)">
    <v-avatar size="100">
      <img :src="tamtamRecommandChannel[0].channel_img" :alt="tamtamRecommandChannel.channel_name" />
    </v-avatar>
    <div class="today-recommand-title">
      <i class="fas fa-crown fa crown-icon" style="color:#ffd700"></i>
      {{ tamtamRecommandChannel[0].channel_name }}
    </div>
    <div class="today-recommand-category">{{ tamtamRecommandChannel[0].channel_category }}</div>
    <div class="today-recommand-main">
      <div class="today-recommand-leftbox">
        <span class="today-recommand-subtitle">구독자</span>
        <span class="today-recommand-subtitle">영상수</span>
        <span class="today-recommand-subtitle">평균 시청수</span>
      </div>
      <div class="today-recommand-rightbox">
        <span>{{ subScribeCnt(tamtamRecommandChannel[0].channel_subscribe) }}</span>
        <span>{{ videoAvgCnt(tamtamRecommandChannel[0].channel_avg_views) }}</span>
        <span>{{ videoCnt(tamtamRecommandChannel[0].channel_video_cnt) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
import router from '@/router'

const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL

export default {
  name: 'HomeChannelRanking',
  data() {
    return {
      tamtamRecommandChannel: {}
    }
  },
  async created() {
    const config = {
      headers: {
        token: cookies.get('token'),
        company_id: cookies.get('companyId')
      }
    }
    const response = await axios.get(`${API_SERVER_URL}/channel/youtube/UC9naDIaJSOFLyZ44_ImEpSQ`, config)
    this.tamtamRecommandChannel = response.data
  },
  methods: {
    moveChannelDetail(channerId) {
      router.push({ name: 'Channel', params: { channelId: channerId } })
    },
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
  }
}
</script>

<style lang="scss" scoped>
.today-recommand {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.today-recommand-title {
  margin-top: 8px;
  font-size: 1.5rem;
  font-weight: 500;
}

.today-recommand-category {
  font-weight: 300;
  margin-bottom: 16px;
}

.today-recommand-main {
  display: flex;
}

.today-recommand-leftbox {
  display: flex;
  flex-direction: column;
}

.today-recommand-rightbox {
  display: flex;
  flex-direction: column;
}

.today-recommand-subtitle {
  font-weight: 300;
  margin-right: 16px;
}
</style>

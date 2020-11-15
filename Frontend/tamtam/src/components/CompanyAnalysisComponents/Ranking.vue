<template>
  <div>
    <header class="card">
      <v-row>
        <v-col class="district"
          ><router-link class="division" to="/rank/subscribes">채널</router-link>
          <v-row>
            <v-col><router-link to="/rank/subscribes">구독자 수</router-link></v-col>
            <v-col><router-link to="/rank/avgviews">구독자 수 대비</router-link></v-col>
          </v-row>
        </v-col>
        <v-col
          ><router-link class="division" to="/rank/likevideotop">동영상</router-link>
          <v-row>
            <v-col><router-link to="/rank/likevideotop">좋아요 수</router-link></v-col>
            <v-col><router-link to="/rank/catevideotop">조회수</router-link></v-col>
          </v-row></v-col
        >
      </v-row>
    </header>
    <div class="card-title" v-if="$route.path === '/mypage'">관련 유튜버 랭킹</div>
    <div class="card-title" v-else-if="$route.path === '/rank/subscribes'">구독자수</div>
    <div class="card-title" v-else-if="$route.path === '/rank/avgviews'">구독자 수 대비 조회수</div>
    <div class="card-title" v-else-if="$route.path === '/rank/likevideotop'">동영상 좋아요 수</div>
    <div class="card-title" v-else>동영상 조회수</div>
    <div v-for="(Item, index) in channel" :key="index">
      <div
        class="card mx-auto mb-2 data"
        @click="moveChannelDetail(Item.channel_youtube_id)"
        v-if="$route.params.subject === 'subscribes' || $route.params.subject === 'avgviews'"
      >
        <v-list-item two-line>
          <a
            @click="moveChannelDetail(Item.channel_youtube_id)"
            v-if="$route.params.subject === 'subscribes' || $route.params.subject === 'avgviews'"
          >
            <v-list-item-avatar size="100">
              <img alt="user" :src="Item.channel_img" />
            </v-list-item-avatar>
          </a>
          <v-list-item-content>
            <div class="overline mb-1" outlined>
              {{ Item.channel_category }}
            </div>
            <div>
              <a
                style="color: black"
                @click="moveChannelDetail(Item.channel_youtube_id)"
                v-if="$route.params.subject === 'subscribes' || $route.params.subject === 'avgviews'"
              >
                <v-list-item-title class="headline mb-1">
                  {{ Item.channel_name }}
                </v-list-item-title>
              </a>
            </div>

            <div class="overline mb-1" outlined v-if="Item.channel_name">
              <v-btn icon @click="moveYoutube(Item.channel_youtube_id, $event)" color="white">
                <v-avatar size="30">
                  <img alt="user" src="https://i.pinimg.com/originals/21/22/ee/2122ee7f9df41666d2ff5c634d6a5c2d.png" />
                </v-avatar>
              </v-btn>
            </div>
          </v-list-item-content>

          <v-list-item-content style="text-align: center; border-right: 1px solid #ebebeb;">
            <div v-if="$route.params.subject === 'subscribes' || $route.params.subject === 'avgviews'">
              <v-list-item-subtitle>구독자수</v-list-item-subtitle>
              <v-list-item-title
                class="v-list-item-title"
                v-if="Item.channel_subscribe < 1000 && Item.channel_subscribe"
                >{{ Item.channel_subscribe }}
              </v-list-item-title>
              <v-list-item-title
                class="v-list-item-title"
                v-else-if="Item.channel_subscribe < 10000 && Item.channel_subscribe"
                >{{ parseInt(Item.channel_subscribe / 1000) }}천
              </v-list-item-title>
              <v-list-item-title class="v-list-item-title" v-else
                >{{ parseInt(Item.channel_subscribe / 10000) }}만
              </v-list-item-title>
            </div>
          </v-list-item-content>

          <v-list-item-content style="text-align: center; border-right: 1px solid #ebebeb;">
            <div v-if="$route.params.subject === 'subscribes' || $route.params.subject === 'avgviews'">
              <v-list-item-subtitle>영상수</v-list-item-subtitle>
              <v-list-item-title class="v-list-item-title" v-if="Item.channel_video_cnt < 1000"
                >{{ Item.channel_video_cnt }}
              </v-list-item-title>
              <v-list-item-title class="v-list-item-title" v-else-if="Item.channel_video_cnt < 10000"
                >{{ (Item.channel_video_cnt / 1000).toFixed(1) }}천
              </v-list-item-title>
              <v-list-item-title class="v-list-item-title" v-else
                >{{ (Item.channel_video_cnt / 10000).toFixed(1) }}만
              </v-list-item-title>
            </div>
          </v-list-item-content>
          <v-list-item-content style="text-align: center">
            <div v-if="$route.params.subject === 'subscribes' || $route.params.subject === 'avgviews'">
              <v-list-item-subtitle>영상별 평균 조회수</v-list-item-subtitle>
              <v-list-item-title class="v-list-item-title">{{ Item.channel_avg_views }} </v-list-item-title>
            </div>
          </v-list-item-content>
        </v-list-item>
      </div>
      <router-link
        :to="{ name: 'VideoDetail', params: { video_youtube_id: Item.video_youtube_id } }"
        class="card mx-auto mb2 data d-block"
        v-else
      >
        <v-list-item two-line>
          <router-link :to="{ name: 'VideoDetail', params: { video_youtube_id: Item.video_youtube_id } }">
            <img class="video-img" :src="Item.video_thumbnails" />
          </router-link>
          <v-list-item-content>
            <router-link :to="{ name: 'VideoDetail', params: { video_youtube_id: Item.video_youtube_id } }">{{
              Item.video_title.slice(0, 13) + '...'
            }}</router-link>
          </v-list-item-content>
          <v-list-item-content style="text-align: center; border-right: 1px solid #ebebeb;">
            <div v-if="$route.params.subject === 'likevideotop'">
              <Like :like="Item.video_like" />
            </div>
            <div v-else>
              <Viewcount :view="Item.video_views" />
            </div>
          </v-list-item-content>
          <v-list-item-content style="text-align: center; border-right: 1px solid #ebebeb;">
            <div v-if="$route.params.subject === 'likevideotop'">
              <Dislike :dislike="Item.video_dislike" />
            </div>
            <div v-else>
              <Like :like="Item.video_like" />
            </div>
          </v-list-item-content>
          <v-list-item-content style="text-align: center">
            <div v-if="$route.params.subject === 'likevideotop'">
              <Viewcount :view="Item.video_views" />
            </div>
            <div v-else>
              <Dislike :dislike="Item.video_dislike" />
            </div>
          </v-list-item-content>
        </v-list-item>
      </router-link>
    </div>
    <infinite-loading v-if="$route.name === 'Utuberank'" @infinite="infiniteHandler" spinner="circles" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import router from '@/router'
import InfiniteLoading from 'vue-infinite-loading'
import axios from 'axios'
import cookies from 'vue-cookies'
import Like from '@/components/RankComponents/Like'
import Dislike from '@/components/RankComponents/Dislike'
import Viewcount from '@/components/RankComponents/Viewcount'

const channelStore = 'channelStore'
const companyStore = 'companyStore'
const homeStore = 'homeStore'
const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL

export default {
  name: 'Ranking',
  data() {
    return {
      config: {
        headers: {
          token: cookies.get('token'),
          limit: 0,
          company_industry: cookies.get('industry')
        }
      },
      channel: []
    }
  },
  components: {
    InfiniteLoading,
    Like,
    Dislike,
    Viewcount
  },
  props: {
    subject: {
      type: String
    }
  },
  created() {
    this.getCategory()
    if (this.$route.name === 'MyPage') {
      this.channel = this.searchChannel()
    }
  },
  computed: {
    // ...mapState(channelStore, ['channel']),
    // ...mapState(rankStore, ['channel'])
    ...mapState(companyStore, ['industry']),
    ...mapState(homeStore, ['companyIndustry'])
  },
  methods: {
    ...mapActions(channelStore, ['searchChannel']),
    ...mapActions(companyStore, ['getCategory']),
    // 채널 디테일로 이동할꺼임
    moveChannelDetail(channerId) {
      router.push({ name: 'Channel', params: { channelId: channerId } })
    },
    moveYoutube(channerId, event) {
      window.open('https://www.youtube.com/channel/' + channerId)
      event.stopPropagation()
    },
    infiniteHandler($state) {
      axios.get(`${API_SERVER_URL}/search/${this.$route.params.subject}`, this.config).then(response => {
        setTimeout(() => {
          if (response.data.length) {
            this.channel = this.channel.concat(response.data)
            $state.loaded()
            this.config.headers.limit += 10
            if (this.channel.length / 10 === 0) {
              $state.complete()
            }
          } else {
            $state.complete()
          }
        }, 1000)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/scss/Rank/rank.scss';
.data {
  /* the other rules */
  transition: all 0.4s;
}
.data:hover {
  transform: scale(1.02);
}
.v-list-item-title {
  font-weight: 900;
  font-size: 24px;
}
</style>

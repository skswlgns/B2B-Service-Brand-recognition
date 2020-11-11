import axios from 'axios'
import cookies from 'vue-cookies'

const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL
const config = {
  headers: {
    token: cookies.get('token')
  }
}

const channelStore = {
  namespaced: true,
  state: {
    isActive: 'subscribe',
    channelData: {},
    views: 0,
    // videoData: {},
    youtubeChannelId: ''
  },
  getters: {
    sliceViews: state => {
      if (state.views < 1000) {
        return state.views
      } else if (state.views < 10000) {
        return state.views / 1000
      } else {
        return parseInt(state.views / 10000)
      }
    }
  },
  mutations: {
    change(state, active) {
      state.isActive = active
    },
    saveData(state, data) {
      state.channelData = data[0]
      state.views = data[0].channel_subscribe
      state.youtubeChannelId = data[0].channel_youtube_id
    },
    saveVideo(state, data) {
      state.videoData = data
    }
  },
  actions: {
    change({ commit }, active) {
      commit('change', active)
    },
    async getChannelData({ commit, dispatch }, data) {
      const response = await axios.get(`${API_SERVER_URL}/channel/${data.id}`, config)
      commit('saveData', response.data)
      // const youtube = {
      //   Id: response.data[0].channel_youtube_id,
      //   page: data.page
      // }
      // dispatch('getVideo', youtube)
    },
    async getVideo({ commit }, youtube) {
      console.log(youtube)
      // const response = await axios.get(`${API_SERVER_URL}/video/videos/${Id}`, config)
      // commit('saveVideo', response.data)
    }
  }
}

export default channelStore

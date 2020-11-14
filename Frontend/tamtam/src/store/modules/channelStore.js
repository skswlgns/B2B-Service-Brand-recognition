import axios from 'axios'
import cookies from 'vue-cookies'
const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL
const config = {
  headers: { token: cookies.get('token'), company_id: cookies.get('companyId') }
}
const channelStore = {
  namespaced: true,
  state: {
    isActive: 'subscribe',
    channelData: {},
    views: 0,
    videoData: {}
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
    setchannel(state, channel) {
      state.channel = channel
    },
    saveData(state, data) {
      console.log(data)
      state.channelData = data[0]
      state.views = data[0].channel_subscribe
      cookies.set('channelId', data[0].channel_youtube_id)
    },
    saveVideo(state, data) {
      state.videoData = data
    }
  },
  actions: {
    change({ commit }, active) {
      commit('change', active)
    },
    // 스크랩 하기/취소
    async scrap({ commit }, id) {
      config.headers.company_id = cookies.get('companyId')
      const body = {
        channel_id: id
      }
      const res = await axios.put(`${API_SERVER_URL}/channel/scrap`, body, config)
      if (res.data.message === '채널 스크랩 완료' || res.data.message === '채널 스크랩 취소') {
        // alert('스크랩 완료')
      }
    },
    // 전체 채널 조회
    async searchChannel({ commit }) {
      config.headers.company_id = cookies.get('companyId')
      const response = await axios.get(`${API_SERVER_URL}/channel`, config)
      commit('setchannel', response.data)
      return response.data
    },
    async getChannelData({ commit }, channelId) {
      const config = {
        headers: {
          token: cookies.get('token')
        }
      }
      // config.headers.company_id = cookies.get('companyId')
      const response = await axios.get(`${API_SERVER_URL}/channel/youtube/${channelId}`, config)
      commit('saveData', response.data)
      // const youtube = {
      //   Id: response.data[0].channel_youtube_id,
      //   page: data.page
      // }
      // dispatch('getVideo', youtube)
    }
  }
}

export default channelStore

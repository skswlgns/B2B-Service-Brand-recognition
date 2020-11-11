import axios from 'axios'
import cookies from 'vue-cookies'
const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL
const config = {
  headers: { token: cookies.get('token'), company_id: cookies.get('companyId') }
}
// http://localhost:3000/api/channel
const channelStore = {
  namespaced: true,
  state: {
    isActive: 'subscribe',
    channel: [],
    channelData: {}
  },
  getters: {
    sliceViews: state => {
      return 1111
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
      state.channelData = data[0]
    }
  },
  actions: {
    change({ commit }, active) {
      commit('change', active)
    },
    // 스크랩 하기/취소
    async scrap({ commit }, id) {
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
      const response = await axios.get(`${API_SERVER_URL}/channel`, config)
      commit('setchannel', response.data)
    },
    async getChannelData({ commit }, channelId) {
      console.log(channelId)
      const config = {
        headers: {
          token: cookies.get('token')
        }
      }
      const response = await axios.get(`${API_SERVER_URL}/channel/${channelId}`, config)
      commit('saveData', response.data)
    }
  }
}

export default channelStore

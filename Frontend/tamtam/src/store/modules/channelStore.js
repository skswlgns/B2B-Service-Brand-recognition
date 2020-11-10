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
    channel: []
  },
  mutations: {
    change(state, active) {
      state.isActive = active
    },
    setchannel(state, channel) {
      state.channel = channel
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
      await axios.put(`${API_SERVER_URL}/channel/scrap`, body, config)
    },
    // 전체 채널 조회
    async searchChannel({ commit }) {
      const response = await axios.get(`${API_SERVER_URL}/channel`, config)
      commit('setchannel', response.data)
    }
  }
}

export default channelStore

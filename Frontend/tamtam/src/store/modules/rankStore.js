import axios from 'axios'
import cookies from 'vue-cookies'

const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL

const rankStore = {
  namespaced: true,
  state: {
    channel: {}
  },
  mutations: {
    saveRankData(state, data) {
      state.channel = data
    }
  },
  actions: {
    async getRankdata({ commit }, subject) {
      const config = {
        headers: {
          token: cookies.get('token')
        }
      }
      const response = await axios.get(`${API_SERVER_URL}/search/${subject}`, config)
      commit('saveRankData', response.data)
    }
  }
}

export default rankStore

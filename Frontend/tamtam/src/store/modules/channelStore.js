import axios from 'axios'

const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL

const channelStore = {
  namespaced: true,
  state: {
    isActive: 'subscribe'
  },
  mutations: {
    change(state, active) {
      state.isActive = active
    }
  },
  actions: {
    change({ commit }, active) {
      commit('change', active)
    },
    async getChannelData({ commit }, channelId) {
      console.log(channelId)
      const response = await axios.get(`${API_SERVER_URL}/channel/${channelId}`)
      console.log(response)
    }
  }
}

export default channelStore

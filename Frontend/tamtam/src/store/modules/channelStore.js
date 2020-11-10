import axios from 'axios'
import cookies from 'vue-cookies'

const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL

const channelStore = {
  namespaced: true,
  state: {
    isActive: 'subscribe',
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
    saveData(state, data) {
      state.channelData = data[0]
    }
  },
  actions: {
    change({ commit }, active) {
      commit('change', active)
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

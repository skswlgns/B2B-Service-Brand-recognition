import axios from 'axios'
import cookies from 'vue-cookies'

const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL

const channelStore = {
  namespaced: true,
  state: {
    isActive: 'subscribe',
    channelData: {},
    views: 0
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
    }
  },
  actions: {
    change({ commit }, active) {
      commit('change', active)
    },
    async getChannelData({ commit }, channelId) {
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

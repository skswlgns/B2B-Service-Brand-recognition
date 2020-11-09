import axios from 'axios'
import cookies from 'vue-cookies'

const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL

const wholeStore = {
  namespaced: true,
  state: {
    channelData: {}
  },
  mutations: {
    saveChannelData(state, data) {
      state.channelData = data
    }
  },
  actions: {
    getChannel({ commit }) {
      const config = {
        headers: {
          token: cookies.get('token')
        }
      }
      axios.get(`${API_SERVER_URL}/channel`, config).then(response => {
        commit('saveChannelData', response.data)
      })
    }
  }
}

export default wholeStore

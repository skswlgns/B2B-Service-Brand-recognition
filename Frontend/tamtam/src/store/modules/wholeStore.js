import axios from 'axios'
import cookies from 'vue-cookies'

const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL

const wholeStore = {
  namespaced: true,
  state: {
    subscribeData: {},
    viewsData: {}
  },
  mutations: {
    saveSubscribeData(state, data) {
      state.subscribeData = data
    },
    saveViewsData(state, data) {
      state.viewsData = data
    }
  },
  actions: {
    async getChannel({ commit }) {
      const config = {
        headers: {
          token: cookies.get('token')
        }
      }
      axios.get(`${API_SERVER_URL}/search/subscribe`, config).then(response => {
        commit('saveSubscribeData', response.data)
      })
      const response = await axios.get(`${API_SERVER_URL}/search/avgview`, config)
      commit('saveViewsData', response.data)
    }
  }
}

export default wholeStore

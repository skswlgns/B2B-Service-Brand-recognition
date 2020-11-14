import axios from 'axios'
import cookies from 'vue-cookies'

const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL

const homeStore = {
  namespaced: true,
  state: {
    homeSubscribeData: [],
    homeViewsData: [],
    homeRecommandChannels: []
  },
  mutations: {
    saveSubscribeData(state, data) {
      state.homeSubscribeData = data
    },
    saveViewsData(state, data) {
      state.homeViewsData = data
    },
    setHomeRecommandChannels(state, data) {
      state.homeRecommandChannels = data
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
      const response = await axios.get(`${API_SERVER_URL}/search/avgviews`, config)
      commit('saveViewsData', response.data)
    },

    // 전체 채널 조회
    async getHomeRecommandChannels({ commit }) {
      const config = {
        headers: {
          token: cookies.get('token'),
          company_id: cookies.get('companyId')
        }
      }
      const response = await axios.get(`${API_SERVER_URL}/channel`, config)
      commit('setHomeRecommandChannels', response.data)
    }
  }
}

export default homeStore

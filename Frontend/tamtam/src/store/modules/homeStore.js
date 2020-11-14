import axios from 'axios'
import cookies from 'vue-cookies'

const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL

const homeStore = {
  namespaced: true,
  state: {
    homeSubscribeChannelRanking: [],
    homeViewsChannelRanking: [],
    homeRecommandChannels: [],
    companyIndustry: ''
  },
  mutations: {
    setHomeSubscribeChannelRanking(state, data) {
      state.homeSubscribeChannelRanking = data
    },
    setHomeViewsChannelRanking(state, data) {
      state.homeViewsChannelRanking = data
    },
    setHomeRecommandChannels(state, data) {
      state.homeRecommandChannels = data
    },
    setCompanyIndustry(state, data) {
      state.companyIndustry = data
    }
  },
  actions: {
    // 채널 랭킹 top5 조회
    async getChannelRankingData({ commit }) {
      const config = {
        headers: {
          token: cookies.get('token')
        }
      }
      axios.get(`${API_SERVER_URL}/search/subscribe`, config).then(response => {
        commit('setHomeSubscribeChannelRanking', response.data)
      })
      const response = await axios.get(`${API_SERVER_URL}/search/avgview`, config)
      commit('setHomeViewsChannelRanking', response.data)
    },

    // 카테고리별 추천 채널 조회
    async getHomeRecommandChannels({ commit }, tmpCompanyIndsutry) {
      const config = {
        headers: {
          token: cookies.get('token'),
          company_id: cookies.get('companyId')
        }
      }
      const response = await axios.get(`${API_SERVER_URL}/search/catechannel`, config)
      commit('setHomeRecommandChannels', response.data)
    },

    // companyIndustry 죄회
    async getCompanyIndustry({ commit }) {
      const config = {
        headers: {
          token: cookies.get('token'),
          company_id: cookies.get('companyId')
        }
      }
      const response = await axios.get(`${API_SERVER_URL}/company/${cookies.get('companyId')}`, config)
      commit('setCompanyIndustry', response.data.company_industry)
    }
  }
}

export default homeStore

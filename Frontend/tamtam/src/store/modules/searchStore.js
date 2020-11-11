import axios from 'axios'
import cookies from 'vue-cookies'
import router from '../../router'

const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL
const config = {
  headers: { token: cookies.get('token'), company_id: cookies.get('companyId') }
}

const searchStore = {
  namespaced: true,
  state: {
    searchText: '',
    channel: [],
    video: []
  },
  mutations: {
    setsearchText(state, text) {
      state.searchText = text
    },
    setChannel(state, data) {
      state.channel = data
    },
    setVideo(state, data) {
      state.video = data
    }
  },
  getters: {
    getsearchText(state) {
      state.searchText = cookies.get('searchText')
      return state.searchText
    },
    getChannel(state) {
      return state.channel
    },
    getVideo(state) {
      return state.video
    }
  },
  actions: {
    search({ commit }, text) {
      commit('setsearchText', text)
      router.push({ name: 'Search', params: { text: text } })
    },
    // 스크랩한 채널 가져오기
    async getScrapChannel({ commit }) {
      config.headers.company_id = cookies.get('companyId')
      const response = await axios.get(`${API_SERVER_URL}/company/channel`, config)
      commit('setChannel', response.data.company_channel)
    },
    // 스크랩한 영상 가져오기
    async getScrapVideo({ commit }) {
      config.headers.company_id = cookies.get('companyId')
      const response = await axios.get(`${API_SERVER_URL}/company/video`, config)
      commit('setVideo', response.data.company_video)
    },
    // 검색 데이터 가져오기
    async getSearch({ commit }, text) {
      config.headers.company_id = cookies.get('companyId')
      const response = await axios.get(`${API_SERVER_URL}/search/${text}`, config)
      commit('setVideo', response.data.videos)
      commit('setChannel', response.data.channels)
    }
  }
}

export default searchStore

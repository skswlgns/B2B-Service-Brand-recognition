import axios from 'axios'
import cookies from 'vue-cookies'
import router from '@/router'

const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL
const config = {
  headers: { token: cookies.get('token'), company_id: cookies.get('companyId') }
}

const searchStore = {
  namespaced: true,
  state: {
    searchText: '',
    channel: [],
    video: [],
    contactChannel: [],
    companyRecommendChannel: [],
    companyRecommendVideo: []
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
    },
    setContactChannel(state, data) {
      state.contactChannel = data
    },
    setCompanyRecommendChannel(state, channel) {
      state.companyRecommendChannel = channel
    },
    setCompanyRecommendVideo(state, video) {
      state.CompanyRecommendVideo = video
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
    // 컨택한 채널 가져오기
    async getContactChannel({ commit }) {
      config.headers.company_id = cookies.get('companyId')
      const response = await axios.get(`${API_SERVER_URL}/company/contact`, config)
      commit('setContactChannel', response.data)
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
    },
    // 로그인한 기업별 유투버 추천
    async getCompanyRecommendChannel({ commit }) {
      config.headers.company_id = cookies.get('companyId')
      const response = await axios.get(`${API_SERVER_URL}/exposure/topchannel`, config)

      commit('setCompanyRecommendChannel', response.data)
    },
    // 로그인한 기업별 영상 추천
    async getCompanyRecommendVideo({ commit }) {
      config.headers.company_id = cookies.get('companyId')
      const response = await axios.get(`${API_SERVER_URL}/exposure/topvideo`, config)
      commit('setCompanyRecommendVideo', response.data)
    }
  }
}

export default searchStore

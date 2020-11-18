import axios from 'axios'
import cookies from 'vue-cookies'

const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL

const videoDetailStore = {
  namespaced: true,
  state: {
    videoData: {},
    recommendVideos: []
  },
  mutations: {
    // videoData 넣어주기
    setVideoData(state, data) {
      state.videoData = data
    },
    // RecommendVideoData 넣어주기
    setRecommendVideoData(state, data) {
      state.recommendVideos = data
    }
  },
  actions: {
    // 스크랩 하기/취소
    async scrap({ commit }, id) {
      const config = { headers: { token: cookies.get('token'), companyid: cookies.get('companyId') } }
      const body = { _id: id }
      const res = await axios.put(`${API_SERVER_URL}/video/scrap`, body, config)
      if (res.data.message === '채널 스크랩 완료' || res.data.message === '채널 스크랩 취소') {
        alert('스크랩 완료 || 취소 완료')
      }
    },
    // videoData API
    async getVideoData({ commit }, videoYoutubeId) {
      const config = { headers: { token: cookies.get('token'), companyid: cookies.get('companyId') } }
      const response = await axios.get(`${API_SERVER_URL}/video/youtube/${videoYoutubeId}`, config)
      commit('setVideoData', response.data)
    },

    // recommendVideos API
    async getRecommendVideoData({ commit }) {
      const config = { headers: { token: cookies.get('token'), companyid: cookies.get('companyId') } }
      config.headers.company_id = cookies.get('companyId')
      const response = await axios.get(`${API_SERVER_URL}/search/recommend`, config)
      commit('setRecommendVideoData', response.data)
    }
  }
}

export default videoDetailStore

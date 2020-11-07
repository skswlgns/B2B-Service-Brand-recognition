import axios from 'axios'
// import cookies from 'vue-cookies'
// import router from '../../router'

const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL

const videoDetailStore = {
  namespaced: true,
  state: {
    videoData: {}
  },
  mutations: {
    // videoData 넣어주기
    setVideoData(state, data) {
      state.videoData = data
    }
  },
  actions: {
    // videoData 불러오기
    async getVideoData({ commit }, videoYoutubeId) {
      const response = await axios.get(`${API_SERVER_URL}/video/youtube/${videoYoutubeId}`)
      commit('setVideoData', response.data)
    }
  }
}

export default videoDetailStore

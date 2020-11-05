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
    async getVideoData(state, videoYoutubeId) {
      // video 데이터 불러오기
      const response = await axios.get(`${API_SERVER_URL}/video/youtube/${videoYoutubeId}`)
      state.videoData = response.data
    }
  },
  actions: {}
}

export default videoDetailStore

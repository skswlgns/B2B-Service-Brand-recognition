import axios from 'axios'
import cookies from 'vue-cookies'
import router from '../../router'

const API_SERVER_URL = 'http://localhost:3000/api'
const config = {
  headers: { token: cookies.get('token'), company_id: cookies.get('companyId') }
}

const searchStore = {
  namespaced: true,
  state: {
    searchText: cookies.get('searchText'),
    channel: [],
    video: []
  },
  mutations: {
    setSearchText(state, text) {
      cookies.set('searchText', text)
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
      return cookies.get('searchText')
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
      if (text === '' || text === undefined) {
        alert('검색어 또는 동영상 URL을 입력해주세요.')
      } else {
        commit('setSearchText', text)
        router.push({ name: 'Search', key: ['aaa'] })
        // router.push({ name: 'Search', key: ['aaa'] }).catch(error => {
        //   if (error.name === 'NavigationDuplicated') {
        //     location.reload()
        //   }
        // })
      }
    },
    // 스크랩한 채널 가져오기
    async getScrapChannel({ commit }) {
      const response = await axios.get(`${API_SERVER_URL}/company/channel`, config)
      commit('setChannel', response.data.company_channel)
    },
    // 스크랩한 영상 가져오기
    async getScrapVideo({ commit }) {
      const response = await axios.get(`${API_SERVER_URL}/company/video`, config)
      commit('setVideo', response.data.company_video)
    },
    // 검색 데이터 가져오기
    async getSearch({ commit }, text) {
      const response = await axios.get(`${API_SERVER_URL}/search/${text}`, config)
      commit('setVideo', response.data.videos)
      commit('setChannel', response.data.channels)
    }
  }
}

export default searchStore

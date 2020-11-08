import axios from 'axios'
import cookies from 'vue-cookies'
import router from '../../router'

const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL

const searchStore = {
  namespaced: true,
  state: {
    searchText: cookies.get('searchText'),
    scrapChannel: {},
    scrapVideo: {}
  },
  mutations: {
    setSearchText(state, text) {
      cookies.set('searchText', text)
    },
    setScrapChannel(state, data) {
      state.scrapChannel = data
    },
    setScrapViedo(state, data) {
      state.scrapVideo = data
    }
  },
  getters: {
    getsearchText(state) {
      return cookies.get('searchText')
    }
  },
  actions: {
    search({ commit }, text) {
      if (text === '' || text === undefined) {
        alert('검색어 또는 동영상 URL을 입력해주세요.')
      } else {
        commit('setSearchText', text)
        router.push({ name: 'Search', key: ['aaa'] })
        router.push({ name: 'Search', key: ['aaa'] }).catch(error => {
          if (error.name === 'NavigationDuplicated') {
            location.reload()
          }
        })
      }
    },
    // 스크랩한 채널 불러오기
    async getScrapChannel({ commit }, companyId) {
      const response = await axios.get(`${API_SERVER_URL}/company/channel/${companyId}`)
      commit('setScrapChannel', response.data)
    },
    // 스크랩한 영상 불러오기
    async getScrapVideo({ commit }, companyId) {
      const response = await axios.get(`${API_SERVER_URL}/company/video/${companyId}`)
      commit('setScrapVideo', response.data)
    }
  }
}

export default searchStore

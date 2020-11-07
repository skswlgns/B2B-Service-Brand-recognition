// import axios from 'axios'
import cookies from 'vue-cookies'
import router from '../../router'

// const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL

const searchStore = {
  namespaced: true,
  state: {
    searchText: cookies.get('searchText')
  },
  mutations: {
    setsearchText(state, text) {
      cookies.set('searchText', text)
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
        commit('setsearchText', text)
        router.push({ name: 'Search', key: ['aaa'] })
        router.push({ name: 'Search', key: ['aaa'] }).catch(error => {
          if (error.name === 'NavigationDuplicated') {
            location.reload()
          }
        })
      }
    }
  }
}

export default searchStore

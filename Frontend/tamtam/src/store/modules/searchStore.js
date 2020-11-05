// import axios from 'axios'
// import cookies from 'vue-cookies'
// import router from '../../router'

// const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL

const searchStore = {
  namespaced: true,
  state: {
    searchText: ''
  },
  mutations: {
    setsearchText(state, text) {
      state.searchText = text
    }
  },
  getters: {
    getsearchText(state) {
      return state.searchText
    }
  },
  actions: {}
}

export default searchStore

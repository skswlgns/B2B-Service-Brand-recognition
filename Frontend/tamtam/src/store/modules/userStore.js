import axios from 'axios'
import cookies from 'vue-cookies'
import router from '../../router'

const SERVER_URL = 'http://localhost:3000/api/company/signin'
const userStore = {
  namespaced: true,
  state: {
    token: cookies.get('token'),
    user_nickname: ''
  },
  mutations: {
    setToken(state, data) {
      cookies.set('token', data)
      router.push('/')
    },
    setNickname(state, nickname) {
      console.log(nickname)
      state.user_nickname = nickname
    }
  },
  actions: {
    login({ commit }, loginData) {
      axios
        .post(`${SERVER_URL}`, loginData)
        .then(response => {
          commit('setToken', response.data.token)
          commit('setNickname', response.data.company_nickname)
        })
        .catch(error => {
          console.log(error)
        })
    },
    logout() {
      cookies.remove('token')
      router.push('/login')
    }
  }
}

export default userStore

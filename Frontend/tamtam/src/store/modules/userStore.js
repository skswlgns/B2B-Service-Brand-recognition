import axios from 'axios'
import cookies from 'vue-cookies'
import router from '../../router'

const SERVER_URL = 'http://localhost:3000/api/company/signin'
const userStore = {
  namespaced: true,
  state: {
    token: cookies.get('token'),
    user_nickname: cookies.get('nick'),
    company_id: cookies.get('companyId')
  },
  mutations: {
    setToken(state, data) {
      cookies.set('token', data)
      router.push('/whole')
    },
    setNickname(state, nickname) {
      cookies.set('nick', nickname)
    },
    setCompanyId(state, companyId) {
      cookies.set('companyId', companyId)
    }
  },
  actions: {
    login({ commit }, loginData) {
      axios
        .post(`${SERVER_URL}`, loginData)
        .then(response => {
          commit('setToken', response.data.token)
          commit('setNickname', response.data.company_nickname)
          commit('setCompanyId', response.data.company_id)
        })
        .catch(error => {
          alert('아이디 혹은 비밀번호를 확인해주세요.')
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

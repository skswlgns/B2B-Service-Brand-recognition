import axios from 'axios'
import cookies from 'vue-cookies'

const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL
const config = {
  headers: { token: cookies.get('token'), company_id: cookies.get('companyId') }
}

const searchStore = {
  namespaced: true,
  state: {
    companyCount: '',
    companyTime: ''
  },
  mutations: {
    setCompanyCount(state, data) {
      state.companyCount = data + '개'
    },
    setCompanyTime(state, data) {
      const s = data % 60
      data -= s
      let m = data / 60
      let h = 0
      if (m >= 60) {
        const tmp = m
        m = tmp % 60
        h = tmp / 60
      }
      data = ''
      if (h > 0) {
        data = h + '시간 '
      }
      if (h > 0 || m > 0) {
        data += m + '분 '
      }
      data += s + '초'
      state.companyTime = data
    }
  },
  getters: {},
  actions: {
    // 영상 갯수, 영상 총 시간 가져오기
    async getCount({ commit }) {
      config.headers.company_id = cookies.get('companyId')
      const response = await axios.get(`${API_SERVER_URL}/video/count`, config)
      commit('setCompanyCount', response.data.companyCount)
      commit('setCompanyTime', response.data.companyTime)
    }
  }
}

export default searchStore

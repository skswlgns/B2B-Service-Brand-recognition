import axios from 'axios'
import Chart from 'chart.js'
import cookies from 'vue-cookies'

const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL

const chartDataStore = {
  namespaced: true,
  state: {
    companyData: []
  },
  mutations: {
    setCompanyData(state, data) {
      state.companyData = data
    }
  },
  actions: {
    async getCompanyData({ commit }) {
      const config = {
        headers: {
          token: cookies.get('token')
        }
      }
      const response = await axios.get(`${API_SERVER_URL}/company`, config)
      commit('setCompanyData', response.data)
    },

    createChart(_, { chartId, chartData }) {
      const ctx = document.getElementById(chartId)
      const newChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
      return newChart
    }
  },
  getters: {}
}

export default chartDataStore

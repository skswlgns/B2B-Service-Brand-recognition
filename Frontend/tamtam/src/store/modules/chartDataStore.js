// import axios from 'axios'
import Chart from 'chart.js'
// import cookies from 'vue-cookies'

// const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL

const chartDataStore = {
  namespaced: true,
  state: {
    allExposureData: [],
    indExposureData: []
  },
  mutations: {
    setAllExposureData(state, data) {
      state.allExposureData = data
    },
    setIndExposureData(state, data) {
      state.indExposureData = data
    }
  },
  actions: {
    // async setAllExposureData({ commit }) {
    //   const config = {
    //     headers: {
    //       token: cookies.get('token')
    //     }
    //   }
    //   const response = await axios.get(`${API_SERVER_URL}/exposure`, config)
    //   commit('setAllExposureData', response.data)
    // },
    // setIndExposureData() {},

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

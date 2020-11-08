const channelStore = {
  namespaced: true,
  state: {
    isActive: 'subscribe'
  },
  mutations: {
    change(state, active) {
      state.isActive = active
    }
  },
  actions: {
    change({ commit }, active) {
      commit('change', active)
    }
  }
}

export default channelStore

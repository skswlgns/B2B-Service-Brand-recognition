import Vue from 'vue'
import Vuex from 'vuex'

import userStore from '../store/modules/userStore.js'
import videoDetailStore from '../store/modules/videoDetailStore.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userStore: userStore,
    videoDetailStore: videoDetailStore
  }
})

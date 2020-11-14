import Vue from 'vue'
import Vuex from 'vuex'

import userStore from '@/store/modules/userStore.js'
import videoDetailStore from '@/store/modules/videoDetailStore.js'
import searchStore from '@/store/modules/searchStore.js'
import channelStore from '@/store/modules/channelStore.js'
import homeStore from '@/store/modules/homeStore.js'
import chartDataStore from '@/store/modules/chartDataStore.js'
import rankStore from '@/store/modules/rankStore.js'
import companyStore from '@/store/modules/companyStore.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userStore: userStore,
    videoDetailStore: videoDetailStore,
    homeStore: homeStore,
    searchStore: searchStore,
    channelStore: channelStore,
    chartDataStore: chartDataStore,
    rankStore: rankStore,
    companyStore: companyStore
  }
})

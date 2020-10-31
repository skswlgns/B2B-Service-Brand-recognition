import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import userStore from "../store/modules/userStore.js";

export default new Vuex.Store({
  modules: {
    userStore: userStore
  }
});

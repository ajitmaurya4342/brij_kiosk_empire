import Vue from 'vue'
import Vuex from 'vuex'
import empStore from './modules/empStore'
import headerCinemaStore from './modules/headerCinemaStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    empStore,
    headerCinemaStore,
  },
})

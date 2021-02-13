import Vue from 'vue';
import Vuex from 'vuex';

/* import state from './state';
import mutations from './mutations';
import getters from './getters';
import actions from './actions'; */

import counter1 from './counter1';
import counter2 from './counter2';
import tab from './tab';

Vue.use(Vuex);

export default new Vuex.Store({
  /* state,
  mutations,
  getters,
  actions, */
  modules: {
    counter1,
    counter2,
    tab,
  },
});

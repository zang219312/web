import { getUserRouters } from '../services';

import { formatRouterTree } from '../libs/utils';
// 异步请求数据
export default {
  async setUserRouters({ commit, state }) {
    console.log(state);
    const userRouters = await getUserRouters(state.uid),
      payload = formatRouterTree(userRouters);
    // mutations
    commit('setUserRouters', payload);
    commit('setAuth', true);
  },
};

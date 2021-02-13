import axios from 'axios';
export default {
  getData(ctx, payload) {
    const { data } = payload;
    axios(data).then((res) => {
      ctx.commit('setData', res.data.data);
    });
  },
};

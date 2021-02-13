export default {
  getMyInfo(state) {
    console.log(state);
    return `${state.name},${state.age}`;
  },
  setData(state, data) {
    state.data = data;
  },
};

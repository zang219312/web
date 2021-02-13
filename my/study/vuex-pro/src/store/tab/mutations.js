export default {
  setCurIdx(state, payload) {
    console.log(state);
    console.log(payload);
    const { index, text } = payload;
    state.curIdx = index;
    console.log(text);
  },
};

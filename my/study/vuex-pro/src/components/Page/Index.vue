<template>
  <div>
    {{ content[curIdx] }}
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Page',
  computed: {
    ...mapState('tab', {
      curIdx: (state) => state.curIdx,
    }),
  },
  data() {
    return {
      content: ['page1', 'page2', 'page3', 'page4'],
    };
  },
};
</script>
<style scoped></style>

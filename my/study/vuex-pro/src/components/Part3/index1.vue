<template
  ><div>
    <h1>count1:{{ count }}</h1>
    <button @click="setCount(4)">加4</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'part2',
  computed: {
    ...mapState('counter1', {
      count: (state) => state.count,
    }),
  },
  methods: {
    ...mapMutations('counter1', ['setCount']),
  },
};
</script>

<style></style>

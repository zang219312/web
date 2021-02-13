<template
  ><div>
    <h1>count2:{{ count }}</h1>
    <button @click="setCount(10)">加10</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'part2',
  computed: {
    ...mapState('counter2', {
      count: (state) => state.count,
    }),
  },
  methods: {
    ...mapMutations('counter2', ['setCount']),
  },
};
</script>

<style></style>

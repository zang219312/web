<template>
  <div class="hello">
    <a
      href="javascript:;"
      :class="[{ current: curIdx === 0 }]"
      @click="changeTap(0, 'xianxiang1')"
      >选项1
    </a>
    <a
      href="javascript:;"
      :class="[{ current: curIdx === 1 }]"
      @click="changeTap(1, 'xianxiang2')"
      >选项2
    </a>
    <a
      href="javascript:;"
      :class="[{ current: curIdx === 2 }]"
      @click="changeTap(2, 'xianxiang3')"
      >选项3
    </a>
    <a
      href="javascript:;"
      :class="[{ current: curIdx === 3 }]"
      @click="changeTap(3, 'xianxiang4')"
      >选项4
    </a>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'Tap',
  computed: {
    ...mapState('tab', {
      curIdx: (state) => state.curIdx,
    }),
  },
  methods: {
    // ...mapMutations('tab', ['setCurIdx']),
    changeTap(index, text) {
      this.$store.commit(
        'setCurIdx',
        {
          index,
          text,
        },
        { root: true }
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
  margin: 10px;
}

.current {
  text-decoration: none;
  color: #000;
}
</style>

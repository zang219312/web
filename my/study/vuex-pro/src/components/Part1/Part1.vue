<template>
  <div>
    <h1>我的信息{{ info }}</h1>
  </div>
</template>

<script>
export default {
  name: 'MyPart',
  data() {
    return {
      info: '',
    };
  },
  mounted() {
    this.info = this.$store.getters.getMyInfo;
  },
};
</script>

<style></style>

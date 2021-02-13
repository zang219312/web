<template> </template>

<script>
export default {
  name: 'part2',
  mounted() {
    this.$store.dispatch('getData', {
      data: 'data',
    });
  },
};
</script>

<style></style>

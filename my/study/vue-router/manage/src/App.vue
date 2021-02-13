<template>
  <div id="app">
    <Mheader />
    <SlideBar />
    <PageBoard />
  </div>
</template>
<script>
import Mheader from '@/components/Mheader';
import SlideBar from '@/components/SlideBar';
import PageBoard from '@/components/PageBoard';


export default {
  name: 'App',
  components: {
    Mheader,
    SlideBar,
    PageBoard,
  },
};
</script>
<style>
#app {
  height: 100%;
}
</style>

<template>
  <div class="slide-bar">
    <ul>
      <li>
        <router-link to="/">首页</router-link>
      </li>
    </ul>
    <template v-for="(item ,index) of $store.state.userRouters">

      <MenuItem
        :key="index"
        :item="item"
      />

    </template>
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue';
export default {
  name: 'SlideBar',
  components: {
    MenuItem
  }
}
</script>

<style>
.slide-bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 200px;
  height: 100%;
  background-color: #ededed;
  padding-top: 90px;
  box-sizing: border-box;
}
</style>
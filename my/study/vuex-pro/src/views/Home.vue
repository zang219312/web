<template>
  <div class="home">
    <Tap />
    <Content></Content>
    <my-part />
    <count1 />
    <count2 />
  </div>
</template>

<script>
// @ is an alias to /src
import Tap from '@/components/Tap/Tap.vue';
import Content from '@/components/Page/Index.vue';
import MyPart from '@/components/Part1/Part1.vue';
import count1 from '@/components/Part3/index1.vue';
import count2 from '@/components/Part3/index2.vue';

export default {
  name: 'Home',
  components: {
    Tap,
    Content,
    MyPart,
    count1,
    count2,
  },
};
</script>

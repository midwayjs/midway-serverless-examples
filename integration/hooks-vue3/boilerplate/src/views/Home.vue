<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld :msg="state.message" />
  </div>
</template>

<script lang="ts">
import { onMounted, reactive } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { hello } from '../apis/lambda';

export default {
  components: {
    HelloWorld,
  },
  setup() {
    const state = reactive({
      message: '',
    });
    onMounted(() => {
      hello().then((res) => {
        console.log(res);
        state.message = res.message;
      });
    });
    return { state };
  },
};
</script>

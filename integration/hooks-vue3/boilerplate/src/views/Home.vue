<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld :msg="message" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { hello } from '../apis/lambda';

@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  message = '';

  created() {
    hello().then((res) => {
      console.log(res);
      this.message = res.message;
    });
  }
}
</script>

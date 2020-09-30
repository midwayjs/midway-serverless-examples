<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld :msg="state.message" />
    <p>
      <button className="send-button" @click="postMessage">
        POST Message To Backend
      </button>
    </p>
    <h2>{{ state.postResult }}</h2>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { hello, sendMessage } from '../apis/lambda';

export default {
  components: {
    HelloWorld,
  },
  setup() {
    const state = reactive({
      message: 'Request Hello Function ……',
      postResult: '',
    });

    onMounted(() => {
      hello().then((res) => {
        console.log(res);
        state.message = `Api response: ${res.message}. HTTP Method: ${res.method}`;
      });
    });

    const postMessage = () => {
      state.postResult = 'Request sendMessage Function ……';
      sendMessage('【POST SUCCESS】').then((res) => {
        state.postResult = res.answer;
      });
    };

    return { state, postMessage };
  },
};
</script>

<style>
.send-button {
  background-color: #42b983; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
}

.send-button:hover {
  background-color: #39ce8a;
}
</style>

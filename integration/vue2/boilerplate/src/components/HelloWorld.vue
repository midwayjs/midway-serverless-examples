<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ faasResponse }}</h1>
    <ul>
      <li>
        <p>Edit <code>/apis/index.ts</code> and save to reload</p>
        <p>快来给 Midway Serverless Star 一个吧！</p>
        <iframe
          style="marginTop: 20; border: 0"
          src="https://ghbtns.com/github-btn.html?user=midwayjs&repo=midway&type=star&count=true&size=large"
          scrolling="0"
          width="150px"
          height="40px"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  @Prop() private faasResponse!: string;
  created(): void {
    fetch("./api/index")
      .then(resp => resp.json())
      .then(data => {
        this.faasResponse = data.message;
      });
  }
}
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
}
</style>

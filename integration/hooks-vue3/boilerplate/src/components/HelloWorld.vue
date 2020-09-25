<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div className="star-container">
      快来给 Midway Serverless Star 一个吧！
      <iframe
        className="iframe-container"
        title="star"
        src="https://ghbtns.com/github-btn.html?user=midwayjs&repo=midway&type=star&count=true&size=large"
        scrolling="0"
        width="150px"
        height="32px"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    msg: { type: String },
  },
};
</script>

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

.star-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.iframe-container {
  border: 0;
}
</style>

<template>
  <div class="about">
    <div className="common-card" v-for="(item, index) in state.list" :key="index">
      <div className="common-title">
        <a :href="'https://www.npmjs.com/package/' + item.name" target="_blank" rel="noopener noreferrer">
          {{ item.name }}
        </a>
      </div>
      <div>{{ item.info }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { onMounted, reactive } from 'vue';
import { getList } from '../apis/lambda';

interface ListState {
  list: List[];
}

interface List {
  name: string;
  info: string;
}

export default {
  setup() {
    const state = reactive<ListState>({ list: [] });

    onMounted(() => {
      getList().then((res) => {
        state.list = res.list;
      });
    });

    return { state };
  },
};
</script>

<style scoped>
.common-card {
  margin-bottom: 24px;
  line-height: 24px;
}

.common-title {
  font-size: 15px;
  font-weight: bold;
}

a {
  color: black;
}
</style>

<script>
import { RouterLink, RouterView } from "vue-router";
import headerr from "./components/Header.vue";
import MainBlock from "./components/MainBlock.vue";
export default {
  components: {
    MainBlock,
    headerr,
    RouterView,
    RouterLink,
  },
};
</script>

<template>
  <headerr />
  <MainBlock />
  <RouterView />
</template>

<style scoped>
* {
  max-width: 79.1667vw;
  margin: 0 auto;
}
</style>

<script>
import { RouterLink, RouterView } from "vue-router";
import headerr from "./components/Header.vue";
import MainBlock from "./components/MainBlock.vue";
import cart from "./components/cart.vue";
export default {
  components: {
    MainBlock,
    headerr,
    RouterView,
    RouterLink,
    cart
  },
};
</script>

<template>
  <headerr />
  <MainBlock />
  <div class="cartBox">
<cart class="cartOne" ImageCart="/1.svg" text-one="UI/UX design" text-two="Предоставим готовые или создадим дизайн под ваши запросы" />
  <div class="da">daasd</div>
  <cart class="cartOne" ImageCart="/1.svg" text-one="UI/UX design" text-two="Предоставим готовые или создадим дизайн под ваши запросы" />
  <div class="da">daasd</div>
  <cart class="cartOne" ImageCart="/1.svg" text-one="UI/UX design" text-two="Предоставим готовые или создадим дизайн под ваши запросы" />
  <div class="da">daasd</div>
  </div>
  
  <RouterView />
</template>

<style scoped>
* {
  max-width: 79.1667vw;
  margin: 0 auto;
}
.cartBox{
  display: flex;
}
.cartOne{
  margin-top: 300px;
}
.da{
  height: 1000 px;
}
</style>

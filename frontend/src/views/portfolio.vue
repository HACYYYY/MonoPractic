<template>
  <OrderModal v-if="selectedService" />
  <div class="mainBox">
    <div class="textBox">
      <h1>portfolio</h1>
      <h2>Наши лучшие работы</h2>
      <buttonOne class="bf" variant="one" text="Заказать" @click="lap = 'Любая'" />
    </div>

    <div class="box">
      <div class="content">
        <div class="contentImg">
          <primerPortfolio SizeW="500px" SizeH="472px" imgPortfolio="/port1.png" />
        </div>
        <a href="https://www.apple.com/">
          <buttonOne variant="two" text="Подробнее" />
        </a>
      </div>
      <div class="content">
        <div class="contentImg">
          <primerPortfolio SizeW="500px" SizeH="472px" imgPortfolio="/port3.png" />
        </div>
        <a href="https://hyperpc.ru/?ysclid=mfo6sqhg78738287451">
          <buttonOne variant="two" text="Подробнее" />
        </a>
      </div>
    </div>
    <div class="content">
      <div class="contentImg">
        <primerPortfolio SizeW="1100px" SizeH="100%" imgPortfolio="/port2.png" />
      </div>
      <a href="https://www.gucci.com/nl/en_gb/nst/gucci-shift">
        <buttonOne variant="two" text="Подробнее" />
      </a>
    </div>
  </div>
</template>
<script>
import ButtonOne from "@/components/ButtonOne.vue";
import primerPortfolio from "@/components/primerPortfolio.vue";
import modal from "@/components/OrderModal.vue";

export default {
  components: {
    primerPortfolio,
    ButtonOne,
    modal,
  },
  data() {
    return {
      lap: "",
    };
  },
  emits: ["cak"],
};
</script>
<style scoped>
.bf {
  box-shadow: 0 0 1vw 0 #0dff00;
}
.textBox {
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  font-size: 3.6458vw;
  font-family: "HACK";
  color: #0dff00;
  margin: 0;
  margin-top: 5.2vw;
}
h2 {
  font-size: 2.6vw;
  font-family: "HACK";
  color: #296300;
}
.box {
  display: flex;
  gap: 5.2vw;
}
.mainBox {
  gap: 5.2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.contentImg {
  border: solid 3px #0dff00;
  height: 100%;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vw;
}
</style>

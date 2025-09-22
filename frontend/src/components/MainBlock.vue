<template>
  <OrderModal v-if="selectedService" />
  <div class="mainBlock">
    <h1>Создаем сайты, которые затягивают пользователей как в паутину</h1>
    <h2>Современные технологии, адаптивный дизайн, молниеносная скорость загрузки.</h2>
    <div class="buttonblock">
      <ButtonOne text="Заказать проект" variant="one" @click="lap = 'Любая'" />
      <ButtonOne text="ПортфоЛио" variant="two" @click="lap = 'Любая'" />
    </div>
  </div>
</template>

<script>
import ButtonOne from "./ButtonOne.vue";
import modal from "./OrderModal.vue";
export default {
  components: {
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
.mainBlock {
  display: flex;
  flex-direction: column;
}
.buttonblock {
  width: max-content;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

h1 {
  font-size: 2.2vw;
  color: #0dff00;
  font-family: "HACK";
  margin: 0;
  margin-top: 6.7708vw;
}
h2 {
  color: #296300;
  font-size: 1vw;
  font-family: "HACK";
  margin: 0;
  margin-top: 1.5625vw;
  margin-bottom: 2.6042vw;
}
</style>

<script>
import { Teleport } from "vue";

export default {
  props: {
    a: {
      type: String,
    },
  },
  emits: ["exit"],
  data() {
    return {
      form: {
        money: "",
        time: "",
        discription: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log("Услуга:", this.a);
      console.log("Данные формы:", this.form);
    },
  },
};
</script>

<template>
  <Teleport to="body" :disabled="!!a">
    <div class="box" @click.self="$emit('exit')" v-if="a">
      <div class="model">
        <h1>Заполни данные для заявки</h1>
        <form class="formMain" @submit.prevent="handleSubmit">
          <div class="inputGroup">
            <input class="inputMain" type="text" :value="a" />
            <label class="inputLabel" for="">Услуга</label>
          </div>
          <div class="inputGroup">
            <input class="inputMain" v-model="form.money" type="text" />
            <label class="inputLabel" for="">Бюджет</label>
          </div>
          <div class="inputGroup">
            <input class="inputMain" v-model="form.time" type="text" placeholder="Укажите в днях" />
            <label class="inputLabel" for="">Сроки</label>
          </div>
          <div class="inputGroup">
            <input class="inputMain" v-model="form.discription" type="text" />
            <label class="inputLabel" for="">Доп Инфа</label>
          </div>
          <input class="buttonSubmit" type="submit" />
        </form>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.buttonSubmit {
  pointer-events: painted;
  border-radius: 0.5vw;
  max-width: max-content;
  max-height: max-content;
  width: 100%;
  height: 100%;
  padding: 0.6375vw 3.8125vw;
  font-size: 1.2vw;
  font-family: "HACK";
  background-color: transparent;
  border: solid 0.1563vw #296300;
  color: #0dff00;
}
.buttonSubmit:hover {
  background: #0dff00;
  color: #000;
  box-shadow: 0 2px 4px rgba(21, 253, 0, 0.2);
  transform: translateY(-2px);
}

.buttonSubmit:active {
  transform: translateY(3px);
  box-shadow: 0 2px 4px rgba(21, 253, 0, 0.2);
}
.inputGroup {
  position: relative;
  margin: 1.0417vw 0;
  outline: none;
}
.inputMain {
  border: #296300 solid 3px;
  border-radius: 5px;
  padding: 0.4vw;
  background-color: transparent;
  font-size: 1vw;
  color: #0dff00;
  font-family: "HACK";
  width: 100%;
  outline: none;
}
.inputLabel {
  position: absolute;
  top: -0.5208vw;
  left: 0.625vw;
  background: black;
  padding: 0 0.5208vw;
  font-family: "HACK";
  font-size: 0.9375vw;
  color: #0dff00;
  pointer-events: none;
  outline: none;
}
.box {
  background-color: rgb(0, 0, 0, 20%);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 98;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.model {
  padding: 50px;
  background-color: rgb(0, 0, 0, 90%);
  border: 3px solid #0dff00;
  border-radius: 30px;
  z-index: 99;
}
h1 {
  font-size: 2.2vw;
  color: #0dff00;
  font-family: "HACK";
}
h2 {
  font-size: 1.5vw;
  color: #0dff00;
  font-family: "HACK";
}
</style>

<template>
  <button :class="[`buttonBox`, `buttonBox--${variant}`]" @click="$emit('click')">
    <span class="buttonText"> {{ text }}</span>
  </button>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  name: `ButtonOne`,
  props: {
    text: {
      type: String,
      default: "Кнопка",
    },
    variant: {
      type: String,
      default: "one",
      validator: (value) => [`one`, `two`].includes(value),
    },
  },
  emits: ["click"],
};
</script>

<style>
.buttonBox {
  border-radius: 0.5vw;
  max-width: max-content;
  max-height: max-content;
  width: 100%;
  height: 100%;
  padding: 0.6375vw 3.8125vw;
  font-size: 1.2vw;
  font-family: "HACK";
}
.buttonBox--one {
  background-color: transparent;
  border: solid 0.1563vw #296300;
  color: #0dff00;
}
.buttonBox--one:hover {
  background-color: #296300;
  color: #000000;
  border: solid 0.1563vw #000000;
  transform: translateY(-4px);
  letter-spacing: 2px;
  box-shadow: 0 5px 20px #0dff00;
}
.buttonBox--two {
  background-color: #0dff00;
  border: #296300 solid 0.1563vw;
  color: #000000;
}
.buttonBox--two:hover {
  background-color: #296300;
  color: #000000;
  border: solid 0.1563vw #000000;
  transform: translateY(-4px);
  letter-spacing: 2px;
  box-shadow: 0 5px 20px #0dff00;
}
</style>

<template>
  <div class="portfolioBox">
    <img :src="imgPortfolio" alt="" :width="SizeW" :height="SizeH" />
  </div>
</template>
<script>
export default {
  props: {
    imgPortfolio: {
      type: String,
    },
    SizeW: {
      type: String,
    },
    SizeH: {
      type: String,
    },
  },
};
</script>
<style></style>

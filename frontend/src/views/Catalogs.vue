<script>
import headerr from "@/components/Header.vue";
import MainBlock from "@/components/MainBlock.vue";
import cart from "@/components/cart.vue";
import FooterBox from "@/components/footer.vue"
import InfoBox from "@/components/InfoBox.vue"
import modal from "@/components/modal.vue"

export default {
  components: {
    MainBlock,
    headerr,
    cart,
    InfoBox,
    modal,
  },
  data(){
    return{
    lap: ""
    }
    
  },
  
  
}
</script>

<template>
  <main>
    <modal :a="lap" @exit="lap=''"/>
    <div class="cartBox">
    <cart class="cartOne" ImageCart="/1.svg" text-one="UI/UX design" text-two="Предоставим готовые или создадим дизайн под ваши запросы" @cak="(v)=>lap=v" />
    <cart class="cartOne" ImageCart="/1.svg" text-one="UI/UX design" text-two="Предоставим готовые или создадим дизайн под ваши запросы" @cak="(v)=>lap=v" />
    <cart class="cartOne" ImageCart="/1.svg" text-one="UI/UX design" text-two="Предоставим готовые или создадим дизайн под ваши запросы" @cak="(v)=>lap=v"  />
    </div>
    
    
  </main>

</template>

<style>
  .cartBox{
  display: flex;
  flex-wrap: wrap;
  gap: 2.292vw;
  justify-content: center;
}

.da{
  height: 1000 px;
}
</style>

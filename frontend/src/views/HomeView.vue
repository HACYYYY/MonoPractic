<script>
import headerr from "@/components/Header.vue";
import MainBlock from "@/components/MainBlock.vue";
import cart from "@/components/cart.vue";
import Reclama from "@/components/Reclama.vue"
import InfoBox from "@/components/InfoBox.vue"
import { getServices } from '@/api/services'
export default {
  components: {
    MainBlock,
    headerr,
    cart,
    InfoBox,
    Reclama
  },
  async mounted() {
    try {

      const services = await getServices()
      console.log('Услуги с сервера:', services)
    } catch (error) {
      console.log('Сервер пока не отвечает, но клиент готов!')
    }
  }
}
</script>

<template>
  <main>
    <MainBlock />
    <div class="cartBox">
    <cart class="cartOne" ImageCart="/1.svg" text-one="UI/UX design" text-two="Предоставим готовые или создадим дизайн под ваши запросы" />
    <cart class="cartOne" ImageCart="/1.svg" text-one="UI/UX design" text-two="Предоставим готовые или создадим дизайн под ваши запросы" />
    <cart class="cartOne" ImageCart="/1.svg" text-one="UI/UX design" text-two="Предоставим готовые или создадим дизайн под ваши запросы" />
    </div>
    <InfoBox />
    <Reclama/>
    <div class="da">daasd</div>
    
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

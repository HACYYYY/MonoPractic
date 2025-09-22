<script>
import { RouterLink, RouterView } from "vue-router";
import headerr from "./components/Header.vue";
import MainBlock from "./components/MainBlock.vue";
import cart from "./components/cart.vue";
import FooterBox from "./components/footer.vue"
import { useAuthStore } from '@/stores/auth'
export default {
  components: {
    MainBlock,
    headerr,
    RouterView,
    RouterLink,
    cart,
    FooterBox
  },
  name: 'App',
  
  setup() {
    const authStore = useAuthStore()
    
    // Восстанавливаем аутентификацию при загрузке приложения
    authStore.initializeAuth()
    
    return {}
  }
};
</script>

<template>
  <header><headerr /></header>
  <main><RouterView /></main>
  <footer><FooterBox/></footer>
  
  
  
  
</template>

<style scoped>
  main{
    flex: 1;
  }
  footer{
    width: 100%;
  }

</style>

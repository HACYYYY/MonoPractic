import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Catalogs from "@/views/Catalogs.vue";
import portfolio from "@/views/portfolio.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/Catalogs",
      name: "Catalog",
      component: Catalogs,
    },
    {
      path: "/portfolio",
      name: "portfolio",
      component: portfolio,
    },
  ],
});

export default router;

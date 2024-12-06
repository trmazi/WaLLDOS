import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";

const routes = [
  {
    meta: {
      title: "Home",
    },
    path: "/",
    name: "main",
    component: MainView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

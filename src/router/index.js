import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";
import SetupView from "@/views/SetupView.vue";

const routes = [
  {
    meta: {
      title: "Home",
    },
    path: "/",
    name: "main",
    component: MainView,
  },
  {
    meta: {
      title: "Setup",
    },
    path: "/setup",
    name: "setup",
    component: SetupView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/draw",
    name: "draw",
    component: () =>
      import( "../components/DrawlingLines.vue"),
  }, {
    path: "/bmw",
    name: "bmw",
    component: () =>
      import( "../components/3DModel.vue"),
  },{
    path: "/iphone",
    name: "iphone",
    component: () =>
      import( "../components/iPhone.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

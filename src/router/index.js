import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/Home.vue";
import detail from "../views/Detail.vue";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
    },
    {
      path: "/story/:id",
      name: "detail",
      component: detail,
    },
  ],
});

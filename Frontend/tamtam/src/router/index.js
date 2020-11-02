import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import Ranking from "@/components/Ranking.vue";
import Recommend from "@/components/Recommend.vue";
import MyAnalysis from "@/views/MyAnalysis.vue";
import Search from "@/views/Search.vue";
import SearchBrand from "@/components/SearchBrand.vue";
import SearchChannel from "@/components/SearchChannel.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/searchBrand",
    name: "SearchBrand",
    component: SearchBrand
  },
  {
    path: "/searchChannel",
    name: "SearchChannel",
    component: SearchChannel
  },
  {
    path: "/search",
    name: "Search",
    component: Search
  },
  {
    path: "/myAnalysis",
    name: "MyAnalysis",
    component: MyAnalysis
  },
  {
    path: "/ranking",
    name: "Ranking",
    component: Ranking
  },
  {
    path: "/recommend",
    name: "Recommend",
    component: Recommend
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

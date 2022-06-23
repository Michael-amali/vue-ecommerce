import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import Overview from "../views/Overview.vue";
import Products from "../views/Products.vue";
import Orders from "../views/Orders.vue";
import Profile from "../views/Profile.vue";
import Checkout from "../views/Checkout.vue";
import UserProducts from "../views/UserProducts.vue";
import NotFound from "../views/NotFound";
import { auth } from "../firebase.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/overview",
    name: "Overview",
    component: Overview,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/products",
    name: "Products",
    component: Products,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/orders",
    name: "Orders",
    component: Orders,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/profiles",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
  {
    path: "/products",
    name: "UserProducts",
    component: UserProducts,
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const currentUser = auth.currentUser;
  if (requiresAuth && !currentUser) {
    next("/");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;

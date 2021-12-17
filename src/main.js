import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Swal from "sweetalert2";
import VueFirestore from "vue-firestore";
require("firebase/firestore");

window.Swal = Swal;

window.Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

import VueCarousel from "vue-carousel";
Vue.use(VueCarousel);

import Vue2Filters from "vue2-filters";
Vue.use(Vue2Filters);

Vue.use(VueFirestore, {
  key: "id", // the name of the property. Default is '.key'.
  enumerable: true, //  whether it is enumerable or not. Default is true.
});

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

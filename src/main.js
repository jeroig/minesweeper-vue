import Vue from "vue";
import VueSwal from "vue-swal";
import App from "./App.vue";
import router from "./router";
//import store from "./store";
import store from "./store/store";

Vue.config.productionTip = false;
Vue.use(VueSwal);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

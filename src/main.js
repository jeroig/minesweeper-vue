import Vue from "vue";
import VueSwal from "vue-swal";
import App from "./App.vue";
import router from "./router";
import store from "@/vuex/store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.use(VueSwal);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

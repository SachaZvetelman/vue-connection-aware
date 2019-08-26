import Vue from "vue";
import App from "./App.vue";
import ConnectionAware from "@/components/ConnectionAware";

Vue.use(ConnectionAware);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

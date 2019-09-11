import Vue from "vue";
import App from "./App.vue";
import ConnectionAwarePlugin from "@/plugins/ConnectionAware";

Vue.use(ConnectionAwarePlugin);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

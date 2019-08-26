import ConnectionAware from "./components/ConnectionAware.vue";

export default {
  install(Vue) {
    Vue.component(ConnectionAware.name, ConnectionAware);

    if (typeof window !== "undefined" && window.Vue) {
      window.Vue.use(ConnectionAware);
    }
  }
};

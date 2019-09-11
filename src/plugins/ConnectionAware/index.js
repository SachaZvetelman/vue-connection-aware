import ConnectionAware from "./ConnectionAware.vue";

const ConnectionAwarePlugin = {
  install(Vue) {
    Vue.component(ConnectionAware.name, ConnectionAware);

    if (typeof window !== "undefined" && window.Vue) {
      window.Vue.use(ConnectionAware);
    }
  }
};

export default ConnectionAwarePlugin;

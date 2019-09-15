import ConnectionAware from "./ConnectionAware.vue";
import merge from "lodash.merge";

function install(Vue, options) {
  if (install.installed) return;
  install.installed = true;

  merge(ConnectionAware.DEFAULT_OPTIONS, options);

  Vue.component(ConnectionAware.name, ConnectionAware);
}

const plugin = {
  install
};

let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

ConnectionAware.install = install;

export default ConnectionAware;

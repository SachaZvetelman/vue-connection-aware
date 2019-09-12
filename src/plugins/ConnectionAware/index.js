import ConnectionAware from "./ConnectionAware.vue";

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
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

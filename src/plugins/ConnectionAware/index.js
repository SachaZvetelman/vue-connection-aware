import ConnectionAware from "./ConnectionAware.vue";

// eslint-disable-next-line no-unused-vars
function install(Vue, options) {
  if (install.installed) return;
  install.installed = true;
  // const data = Object.assign({}, options);
  // ConnectionAware.extend({
  //   data: function() {
  //     return data;
  //   }
  // });
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

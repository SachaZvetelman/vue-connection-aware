import Vue from 'vue'
import App from './App.vue'
import ConnectionAware from './directives/ConnectionAware';
// import ConnectionAware from './plugins/ConnectionAware'

// Vue.use(ConnectionAware);

Vue.config.productionTip = false

Vue.directive("connection-aware", ConnectionAware)

new Vue({
  render: h => h(App),
}).$mount('#app')

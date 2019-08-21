import Vue from 'vue'
import App from './App.vue'
// import ConnectionAware from './directives/ConnectionAware';
// import ConnectionAware from './plugins/ConnectionAware'

// Vue.use(ConnectionAware);

Vue.config.productionTip = false

// Vue.directive("connection-aware", ConnectionAware)

Vue.directive("connection-aware", function (el, binding, vnode) {
  const comment = document.createComment(' ')

  Object.defineProperty(comment, 'setAttribute', {
    value: () => undefined
  })

  vnode.text = ' '
  vnode.elm = comment
  vnode.isComment = true
  vnode.context = undefined
  vnode.tag = undefined
  vnode.data.directives = undefined

  if (vnode.componentInstance) {
    vnode.componentInstance.$el = comment
  }

  if (el.parentNode) {
    el.parentNode.replaceChild(comment, el)
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app')

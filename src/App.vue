<template>
  <div id="app">
    <connection-aware v-bind:minimumSpeed="11">
      <img alt="Vue logo" src="./assets/logo.png">
    </connection-aware>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ConnectionAware from './components/ConnectionAware.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    ConnectionAware
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

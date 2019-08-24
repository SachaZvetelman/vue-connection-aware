<template>
  <div id="app">
    <connection-aware minEffectiveType="4g">
      <div style="color: gray">This gif is rendered when on 4g</div>
      <img src="https://media0.giphy.com/media/9JtCD5WDQHfqQgmTjN/giphy.gif" crossorigin="anonymous" />
    </connection-aware>
    <connection-aware minEffectiveType="3g">
      <div style="color: brown">This image is rendered when on 3g or faster</div>
      <img alt="Vue logo" src="./assets/logo.png">
    </connection-aware>    
    <connection-aware minEffectiveType="2g">
      <div style="color:green">This text is rendered when on 2g or faster</div>
    </connection-aware>   
    <connection-aware minEffectiveType="slow-2g">
      <div style="color:red">This text is always rendered</div>
    </connection-aware>   
  </div>
</template>

<script>
import ConnectionAware from './components/ConnectionAware.vue'

export default {
  name: 'app',
  components: {
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

#app div {
  margin: 10px;
}
</style>

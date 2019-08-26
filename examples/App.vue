<template>
  <div id="app">
    <connection-aware fast>
      <div style="color: gray">This gif is rendered when connection is fast</div>
      <img
        src="https://media0.giphy.com/media/9JtCD5WDQHfqQgmTjN/giphy.gif"
        crossorigin="anonymous"
      />
    </connection-aware>
    <connection-aware fast v-bind:reactive="false">
      <div
        style="color: blueviolet"
      >This gif is rendered when connection is fast and it's not reactive (meaning that it won't react to connection changes)</div>
      <img src="https://i.imgur.com/ng9Hl87.gif" crossorigin="anonymous" />
    </connection-aware>
    <connection-aware medium fast>
      <div style="color: purple">This text is rendered when connection is medium or fast</div>
    </connection-aware>
    <connection-aware medium>
      <div style="color: brown">This image is rendered when connection is medium</div>
      <img alt="Vue logo" src="./assets/logo.png" />
    </connection-aware>
    <connection-aware slow>
      <div style="color:green">This text is rendered when connection is slow</div>
    </connection-aware>
    <div style="color:red">This text is always rendered</div>
  </div>
</template>

<script>
import ConnectionAware from "@/components/ConnectionAware.vue";

export default {
  name: "app",
  components: {
    ConnectionAware
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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

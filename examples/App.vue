<template>
  <div id="app">
    <div class="row card-container">
      <div class="col">
        <div class="card">
          <div class="card-content">
            <p>This text is always rendered</p>
          </div>
        </div>
      </div>
      <connection-aware fast>
        <div class="col">
          <div class="card">
            <div class="card-image">
              <img
                src="https://media0.giphy.com/media/9JtCD5WDQHfqQgmTjN/giphy.gif"
                crossorigin="anonymous"
              />
            </div>
            <div class="card-content">
              <p>This gif is rendered when connection is fast</p>
            </div>
          </div>
        </div>
      </connection-aware>
      <connection-aware medium fast>
        <div class="col">
          <div class="card">
            <div class="card-content">
              <p>This text is rendered when connection is medium or fast</p>
            </div>
          </div>
        </div>
      </connection-aware>
      <connection-aware medium>
        <div class="col">
          <div class="card">
            <div class="card-image">
              <img src="./assets/image.jpg" />
            </div>
            <div class="card-content">
              <p>This image is rendered when connection is medium</p>
            </div>
          </div>
        </div>
      </connection-aware>
      <connection-aware fast v-bind:reactive="false">
        <div class="col">
          <div class="card">
            <div class="card-image">
              <img src="https://i.imgur.com/ng9Hl87.gif" crossorigin="anonymous" />
            </div>
            <div class="card-content">
              <p>This gif is rendered when connection is fast and it's not reactive (meaning that it won't react to connection changes)</p>
            </div>
          </div>
        </div>
      </connection-aware>
      <connection-aware slow>
        <div class="col">
          <div class="card">
            <div class="card-content">
              <p>This text is rendered when connection is slow</p>
            </div>
          </div>
        </div>
      </connection-aware>
    </div>
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
@import "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css";

.card {
  width: 300px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
}
</style>

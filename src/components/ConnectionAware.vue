<template>
  <div v-if="isConnectionFast">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ConnectionAware',
  props: ['minimumSpeed'],
  computed: {
    isConnectionFast: function () {
      if(!navigator) {
        return true;
      }
      
      // eslint-disable-next-line no-unused-vars
      const { downlink, rrt, effectiveType } = navigator.connection;
  
      if(downlink < this.minimumSpeed){
        return false;
      }

      return true;
    }
  }
}
</script>

<style scoped>
</style>

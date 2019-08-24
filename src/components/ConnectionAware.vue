<template>
  <div v-if="shouldRender">
    <slot></slot>
    {{ minEffectiveType }}
  </div>   
</template>

<script>
const effectiveTypes = ['slow-2g', '2g', '3g', '4g'];

export default {
  name: 'ConnectionAware',
  props: {
    minEffectiveType: {
      type: String,
      validator: function (value) {
        return effectiveTypes.indexOf(value) !== -1;
      }
    },
    maxEffectiveType: {
      type: String,
      validator: function (value) {
        return effectiveTypes.indexOf(value) !== -1;
      }
    } 
  },
  computed: {
    shouldRender: function () {
      if(!navigator) {
        return true;
      }
      
      const { effectiveType } = navigator.connection;
      const effectiveTypeIndex = effectiveTypes.indexOf(effectiveType);
      const minEffectiveTypeIndex =  effectiveTypes.indexOf(this.minEffectiveType);
      const maxEffectiveTypeIndex =  effectiveTypes.indexOf(this.maxEffectiveType);

      if(effectiveTypeIndex >= minEffectiveTypeIndex || effectiveTypeIndex <= maxEffectiveTypeIndex) {
        return true;
      }

      return false;
    }
  }
}
</script>

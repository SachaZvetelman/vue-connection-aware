<template>
  <div v-if="shouldRender">
    <slot></slot>
  </div>
</template>

<script>
const speed = {
  slow: "slow",
  medium: "medium",
  fast: "fast"
};

const effectiveTypesToSpeed = {
  "slow-2g": speed.slow,
  "2g": speed.slow,
  "3g": speed.medium,
  "4g": speed.fast
};

export default {
  name: "ConnectionAware",
  props: {
    slow: {
      type: Boolean,
      default: false
    },
    medium: {
      type: Boolean,
      default: false
    },
    fast: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    shouldRender: function() {
      if (!navigator) {
        return true;
      }

      const effectiveSpeed =
        effectiveTypesToSpeed[navigator.connection.effectiveType];
      const shouldRenderForEffectiveSpeed = this[effectiveSpeed];

      return shouldRenderForEffectiveSpeed;
    }
  }
};
</script>

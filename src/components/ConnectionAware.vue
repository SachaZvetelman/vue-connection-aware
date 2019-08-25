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
    },
    reactive: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      effectiveType: null
    };
  },
  computed: {
    shouldRender: function() {
      if (!this.effectiveType) {
        return true;
      }

      const effectiveSpeed = effectiveTypesToSpeed[this.effectiveType];
      const shouldRenderForEffectiveSpeed = this[effectiveSpeed];

      return shouldRenderForEffectiveSpeed;
    }
  },
  methods: {
    updateEffectiveType() {
      this.effectiveType = navigator.connection
        ? navigator.connection.effectiveType
        : null;
    }
  },
  created: function() {
    if (navigator.connection) {
      if (this.reactive) {
        navigator.connection.addEventListener(
          "change",
          this.updateEffectiveType
        );
      }
      this.updateEffectiveType();
    }
  },
  destroyed: function() {
    if (navigator.connection && this.reactive) {
      navigator.connection.removeEventListener(
        "change",
        this.updateEffectiveType
      );
    }
  }
};
</script>

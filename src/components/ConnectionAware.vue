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
    },
    online: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      connection: {
        effectiveType: null,
        isOnline: null
      }
    };
  },
  computed: {
    shouldRender: function() {
      if (this.connection.effectiveType === null && this.connection.isOnline === null) {
        return true;
      }

      const effectiveSpeed = effectiveTypesToSpeed[this.connection.effectiveType];
      const shouldRenderForEffectiveSpeed = this[effectiveSpeed] || (!this.slow && !this.medium && !this.fast);
      const shouldRenderForOnlineStatus = this.connection.isOnline === this.online;

      return shouldRenderForEffectiveSpeed && shouldRenderForOnlineStatus;
    }
  },

  created: function() {
    if (this.reactive) {
      navigator?.connection?.addEventListener("change", this.updateConnection);
    }

    this.updateConnection();
  },

  destroyed: function() {
    if (this.reactive) {
      navigator?.connection?.removeEventListener("change", this.updateConnection);
    }
  },

  methods: {
    updateConnection() {
      this.connection.effectiveType = navigator?.connection?.effectiveType;
      this.connection.isOnline = navigator?.onLine;
    }
  }
};
</script>

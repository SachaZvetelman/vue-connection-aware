<template>
  <div v-if="shouldRender">
    <slot></slot>
  </div>
</template>

<script>
const connectionCategory = {
  slow: "slow",
  medium: "medium",
  fast: "fast"
};

export default {
  name: "ConnectionAware",
  props: {
    [connectionCategory.slow]: {
      type: Boolean,
      default: false
    },
    [connectionCategory.medium]: {
      type: Boolean,
      default: false
    },
    [connectionCategory.fast]: {
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
        downloadSpeed: null,
        isOnline: null
      },
      connectionCategoryThreshold: {
        [connectionCategory.slow]: 2,
        [connectionCategory.medium]: 6,
        [connectionCategory.fast]: Number.MAX_SAFE_INTEGER
      }
    };
  },

  computed: {
    shouldRender: function() {
      if (this.connection.downloadSpeed == null && this.connection.isOnline == null) {
        return true;
      }

      const connectionCategory = this.getConnectionCategoryByDownloadSpeed(this.connection.downloadSpeed);
      const shouldRenderForDownloadSpeed = this[connectionCategory] || (!this.slow && !this.medium && !this.fast);
      const shouldRenderForOnlineStatus = this.connection.isOnline === this.online;

      return shouldRenderForDownloadSpeed && shouldRenderForOnlineStatus;
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
      this.connection.downloadSpeed = navigator?.connection?.downlink;
      this.connection.isOnline = navigator?.onLine;
    },

    getConnectionCategoryByDownloadSpeed(downloadSpeed) {
      if (downloadSpeed <= this.connectionCategoryThreshold.slow) return connectionCategory.slow;
      if (downloadSpeed <= this.connectionCategoryThreshold.medium) return connectionCategory.medium;

      return connectionCategory.fast;
    }
  }
};
</script>

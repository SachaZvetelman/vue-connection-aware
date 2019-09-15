<template>
  <div v-if="shouldRender">
    <slot></slot>
  </div>
</template>

<script>
const DEFAULT_OPTIONS = {
  connectionCategoryThreshold: {
    slow: 1,
    medium: 2,
    fast: Number.MAX_SAFE_INTEGER
  }
};

export default {
  DEFAULT_OPTIONS: DEFAULT_OPTIONS,
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
        downloadSpeed: null,
        isOnline: null
      },
      connectionCategoryThreshold: DEFAULT_OPTIONS.connectionCategoryThreshold
    };
  },

  computed: {
    shouldRender: function() {
      if (this.connection.downloadSpeed == null && this.connection.isOnline == null) {
        return true;
      }

      const connectionCategory = this.getConnectionCategoryByDownloadSpeed(this.connection.downloadSpeed);
      const shouldRenderForDownloadSpeed =
        this[connectionCategory] || (!this.slow && !this.medium && !this.fast);

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
      if (downloadSpeed <= this.connectionCategoryThreshold.slow) return "slow";
      if (downloadSpeed <= this.connectionCategoryThreshold.medium) return "medium";

      return "fast";
    }
  }
};
</script>

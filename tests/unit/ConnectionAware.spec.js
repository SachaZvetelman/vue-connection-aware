import { shallowMount } from "@vue/test-utils";
import ConnectionAware from "@/components/ConnectionAware.vue";

describe("ConnectionAware.vue", () => {
  let map;

  beforeEach(() => {
    map = {};
  });

  describe("single props", () => {
    it("renders element when fast prop is true and effectiveType is 4g", () => {
      // Arrange
      global.navigator.connection = {
        effectiveType: "4g",
        addEventListener: jest.fn((event, callback) => {
          map[event] = callback;
        })
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { fast: true }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("renders element when medium prop is true and effectiveType is 3g", () => {
      // Arrange
      global.navigator.connection = {
        effectiveType: "3g",
        addEventListener: jest.fn((event, callback) => {
          map[event] = callback;
        })
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { medium: true }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("renders element when slow prop is true and effectiveType is 2g", () => {
      // Arrange
      global.navigator.connection = {
        effectiveType: "2g",
        addEventListener: jest.fn((event, callback) => {
          map[event] = callback;
        })
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { slow: true }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("renders element when slow prop is true and effectiveType is slow-2g", () => {
      // Arrange
      global.navigator.connection = {
        effectiveType: "slow-2g",
        addEventListener: jest.fn((event, callback) => {
          map[event] = callback;
        })
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { slow: true }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("does not render element when fast prop is true and effectiveType is not 4g", () => {
      // Arrange
      global.navigator.connection = {
        effectiveType: "3g",
        addEventListener: jest.fn((event, callback) => {
          map[event] = callback;
        })
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { fast: true }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(false);
    });

    it("does not render element when medium prop is true and effectiveType is not 3g", () => {
      // Arrange
      global.navigator.connection = {
        effectiveType: "4g",
        addEventListener: jest.fn((event, callback) => {
          map[event] = callback;
        })
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { medium: true }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(false);
    });

    it("does not render element when slow prop is true and effectiveType is not 2g", () => {
      // Arrange
      global.navigator.connection = {
        effectiveType: "4g",
        addEventListener: jest.fn((event, callback) => {
          map[event] = callback;
        })
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { slow: true }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(false);
    });

    it("does not render element when slow prop is true and effectiveType is not slow-2g", () => {
      // Arrange
      global.navigator.connection = {
        effectiveType: "3g",
        addEventListener: jest.fn((event, callback) => {
          map[event] = callback;
        })
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { slow: true }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(false);
    });
  });
  describe("multiple props", () => {
    it("renders element when fast and medium props are true and effectiveType is 4g", () => {
      // Arrange
      global.navigator.connection = {
        effectiveType: "4g",
        addEventListener: jest.fn((event, callback) => {
          map[event] = callback;
        })
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { fast: true, medium: true }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("renders element when fast and medium props are true and effectiveType is 3g", () => {
      // Arrange
      global.navigator.connection = {
        effectiveType: "3g",
        addEventListener: jest.fn((event, callback) => {
          map[event] = callback;
        })
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { fast: true, medium: true }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("does not render element when fast and medium props are true and effectiveType is not 3g or 4g", () => {
      // Arrange
      global.navigator.connection = {
        effectiveType: "2g",
        addEventListener: jest.fn((event, callback) => {
          map[event] = callback;
        })
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { fast: true, medium: true }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(false);
    });

    it("does not render element when fast and slow props are true and effectiveType is 3g", () => {
      // Arrange
      global.navigator.connection = {
        effectiveType: "3g",
        addEventListener: jest.fn((event, callback) => {
          map[event] = callback;
        })
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { fast: true, slow: true }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(false);
    });
  });

  describe("browser not supported", () => {
    it("renders element when browser does not support network information api", () => {
      // Arrange
      global.navigator.connection = undefined;

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { fast: true }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(true);
    });
  });
});

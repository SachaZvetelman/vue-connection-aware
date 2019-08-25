import { shallowMount } from "@vue/test-utils";
import ConnectionAware from "@/components/ConnectionAware.vue";

describe("ConnectionAware.vue", () => {
  let addEventListenerMock;

  beforeEach(() => {
    addEventListenerMock = jest.fn();
  });

  describe("updateEffectiveType", () => {
    it("called when component created", () => {
      // Arrange
      const updateEffectiveType = jest.fn();
      global.navigator.connection = {
        effectiveType: "4g",
        addEventListener: addEventListenerMock
      };

      // Act
      shallowMount(ConnectionAware, {
        propsData: { fast: true },
        methods: {
          updateEffectiveType
        }
      });

      // Assert
      expect(updateEffectiveType).toHaveBeenCalled();
    });

    it("sets the effectiveType data", () => {
      // Arrange
      global.navigator.connection = {
        effectiveType: "4g",
        addEventListener: addEventListenerMock
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { fast: true }
      });

      wrapper.vm.updateEffectiveType();

      // Assert
      expect(wrapper.vm.effectiveType).toBe("4g");
    });

    describe("browser not supported", () => {
      it("does not set the effectiveType data", () => {
        // Arrange
        global.navigator.connection = undefined;

        // Act
        const wrapper = shallowMount(ConnectionAware, {
          propsData: { fast: true }
        });

        wrapper.vm.updateEffectiveType();

        // Assert
        expect(wrapper.vm.effectiveType).toBe(null);
      });
    });
  });

  describe("single props", () => {
    it("renders element when fast prop is true and effectiveType is 4g", () => {
      // Arrange
      global.navigator.connection = {
        effectiveType: "4g",
        addEventListener: addEventListenerMock
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
        addEventListener: addEventListenerMock
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
        addEventListener: addEventListenerMock
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
        addEventListener: addEventListenerMock
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
        addEventListener: addEventListenerMock
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
        addEventListener: addEventListenerMock
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
        addEventListener: addEventListenerMock
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
        addEventListener: addEventListenerMock
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { slow: true }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(false);
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

  describe("multiple props", () => {
    it("renders element when fast and medium props are true and effectiveType is 4g", () => {
      // Arrange
      global.navigator.connection = {
        effectiveType: "4g",
        addEventListener: addEventListenerMock
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
        addEventListener: addEventListenerMock
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
        addEventListener: addEventListenerMock
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
        addEventListener: addEventListenerMock
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { fast: true, slow: true }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(false);
    });

    describe("browser not supported", () => {
      it("renders element when browser does not support network information api", () => {
        // Arrange
        global.navigator.connection = undefined;

        // Act
        const wrapper = shallowMount(ConnectionAware, {
          propsData: { fast: true, medium: true }
        });

        // Assert
        expect(wrapper.find("div").exists()).toBe(true);
      });
    });
  });

  describe("event listeners", () => {
    it("adds event listener on created to update effectiveType when connection changes", () => {
      // Arrange
      global.navigator.connection = {
        effectiveType: "4g",
        addEventListener: addEventListenerMock
      };

      // Act
      shallowMount(ConnectionAware, {
        propsData: { fast: true }
      });

      // Assert
      expect(addEventListenerMock).toHaveBeenCalledWith("change", expect.any(Function)); // TODO: find a more specific assertion. Solution from https://github.com/facebook/jest/issues/6390#issuecomment-394307966
    });

    it("removes event listener on destroyed to stop updating effectiveType when connection changes", () => {
      // Arrange
      const removeEventListenerMock = jest.fn();

      global.navigator.connection = {
        effectiveType: "4g",
        addEventListener: addEventListenerMock,
        removeEventListener: removeEventListenerMock
      };

      // Act
      shallowMount(ConnectionAware, {
        propsData: { fast: true }
      }).destroy();

      // Assert
      expect(removeEventListenerMock).toHaveBeenCalledWith("change", expect.any(Function));
    });

    describe("browser not supported", () => {
      it("does not add event listener on created to update effectiveType when connection changes", () => {
        // Arrange
        global.navigator.connection = undefined;

        // Act & Assert
        shallowMount(ConnectionAware, {
          propsData: { fast: true }
        });
      });

      it("does not remove event listener on destroyed to stop updating effectiveType when connection changes", () => {
        // Arrange
        global.navigator.connection = undefined;

        // Act & Assert
        shallowMount(ConnectionAware, {
          propsData: { fast: true }
        }).destroy();
      });
    });
  });
});

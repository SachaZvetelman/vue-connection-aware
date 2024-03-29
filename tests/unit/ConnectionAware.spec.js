import { shallowMount } from "@vue/test-utils";
import ConnectionAware from "@/plugins/ConnectionAware/ConnectionAware.vue";

const slowSpeed = 0.9;
const mediumSpeed = 1.9;
const fastSpeed = 10;

describe("ConnectionAware.vue", () => {
  let addEventListener;
  let onLineGetter;

  beforeEach(() => {
    addEventListener = jest.fn();
    onLineGetter = jest.spyOn(global.navigator, "onLine", "get");
    onLineGetter.mockReturnValue(true);
  });

  afterEach(() => {
    onLineGetter.mockRestore();
  });

  describe("updateConnection", () => {
    it("called when component created", () => {
      // Arrange
      const updateConnection = jest.fn();
      global.navigator.connection = {
        downlink: fastSpeed,
        addEventListener
      };

      // Act
      shallowMount(ConnectionAware, {
        propsData: { fast: true },
        methods: {
          updateConnection
        }
      });

      // Assert
      expect(updateConnection).toHaveBeenCalled();
    });

    it("sets the downloadSpeed data", () => {
      // Arrange
      global.navigator.connection = {
        downlink: fastSpeed,
        addEventListener
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { fast: true }
      });

      wrapper.vm.updateConnection();

      // Assert
      expect(wrapper.vm.connection.downloadSpeed).toBe(10);
    });

    it("sets the isOnline data", () => {
      // Arrange
      onLineGetter.mockReturnValue(true);

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { fast: true }
      });

      wrapper.vm.updateConnection();

      // Assert
      expect(wrapper.vm.connection.isOnline).toBe(true);
    });

    describe("browser not supported", () => {
      it("does not set the downloadSpeed data", () => {
        // Arrange
        global.navigator.connection = undefined;

        // Act
        const wrapper = shallowMount(ConnectionAware, {
          propsData: { fast: true }
        });

        wrapper.vm.updateConnection();

        // Assert
        expect(wrapper.vm.connection.downloadSpeed).toBe(undefined);
      });

      it("does not set the isOnline data", () => {
        // Arrange
        onLineGetter.mockReturnValue(undefined);

        // Act
        const wrapper = shallowMount(ConnectionAware, {
          propsData: { fast: true }
        });

        wrapper.vm.updateConnection();

        // Assert
        expect(wrapper.vm.connection.isOnline).toBe(undefined);
      });
    });
  });

  describe("getConnectionCategoryByDownloadSpeed", () => {
    it.each([[slowSpeed], [slowSpeed + 0.1]])(
      "returns slow category when speed is within the slow category",
      speed => {
        // Arrange
        const wrapper = shallowMount(ConnectionAware);

        // Act
        const result = wrapper.vm.getConnectionCategoryByDownloadSpeed(speed);

        // Assert
        expect(result).toBe("slow");
      }
    );

    it.each([[mediumSpeed], [mediumSpeed + 0.1]])(
      "returns medium category when speed is within the medium category",
      speed => {
        // Arrange
        const wrapper = shallowMount(ConnectionAware);

        // Act
        const result = wrapper.vm.getConnectionCategoryByDownloadSpeed(speed);

        // Assert
        expect(result).toBe("medium");
      }
    );

    it("returns fast category when speed is within the fast category", () => {
      // Arrange
      const wrapper = shallowMount(ConnectionAware);

      // Act
      const result = wrapper.vm.getConnectionCategoryByDownloadSpeed(fastSpeed);

      // Assert
      expect(result).toBe("fast");
    });
  });

  describe("single props", () => {
    it("renders element when no props are passed", () => {
      // Arrange
      global.navigator.connection = {
        downlink: 10,
        addEventListener
      };

      // Act
      const wrapper = shallowMount(ConnectionAware);

      // Assert
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("renders element when fast prop is true and downloadSpeed is within the fast category", () => {
      // Arrange
      global.navigator.connection = {
        downlink: 10,
        addEventListener
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { fast: true }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("renders element when medium prop is true and downloadSpeed is within the medium category", () => {
      // Arrange
      global.navigator.connection = {
        downlink: mediumSpeed,
        addEventListener
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { medium: true }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("renders element when slow prop is true and downloadSpeed is within the slow category", () => {
      // Arrange
      global.navigator.connection = {
        downlink: slowSpeed,
        addEventListener
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { slow: true }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it.each([[true, true], [false, false]])(
      "renders element when online prop is %s and isOnline is %s",
      (onlineProp, isOnline) => {
        // Arrange
        onLineGetter.mockReturnValue(isOnline);

        // Act
        const wrapper = shallowMount(ConnectionAware, {
          propsData: { online: onlineProp }
        });

        // Assert
        expect(wrapper.find("div").exists()).toBe(true);
      }
    );

    it("does not render element when fast prop is true and downloadSpeed is not within the fast category", () => {
      // Arrange
      global.navigator.connection = {
        downlink: mediumSpeed,
        addEventListener
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { fast: true }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(false);
    });

    it("does not render element when medium prop is true and downloadSpeed is not within the medium category", () => {
      // Arrange
      global.navigator.connection = {
        downlink: slowSpeed,
        addEventListener
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { medium: true }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(false);
    });

    it("does not render element when slow prop is true and downloadSpeed is within the medium category", () => {
      // Arrange
      global.navigator.connection = {
        downlink: mediumSpeed,
        addEventListener
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { slow: true }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(false);
    });

    it.each([[true, false], [false, true]])(
      "does not render element when online prop is %s and isOnline is %s",
      (onlineProp, isOnline) => {
        // Arrange
        onLineGetter.mockReturnValue(isOnline);

        // Act
        const wrapper = shallowMount(ConnectionAware, {
          propsData: { online: onlineProp }
        });

        // Assert
        expect(wrapper.find("div").exists()).toBe(false);
      }
    );

    describe("browser not supported", () => {
      it("renders element when browser does not support network information api nor online property", () => {
        // Arrange
        onLineGetter.mockReturnValue(undefined);
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
    it("renders element when fast and medium props are true and downloadSpeed is within the fast category", () => {
      // Arrange
      global.navigator.connection = {
        downlink: fastSpeed,
        addEventListener
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { fast: true, medium: true }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("renders element when fast and medium props are true and downloadSpeed is within the medium category", () => {
      // Arrange
      global.navigator.connection = {
        downlink: mediumSpeed,
        addEventListener
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { fast: true, medium: true }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("does not render element when fast and medium props are true and downloadSpeed is within the slow category", () => {
      // Arrange
      global.navigator.connection = {
        downlink: slowSpeed,
        addEventListener
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { fast: true, medium: true }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(false);
    });

    it("does not render element when fast and slow props are true and downloadSpeed is within the medium category", () => {
      // Arrange
      global.navigator.connection = {
        downlink: mediumSpeed,
        addEventListener
      };

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { fast: true, slow: true }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(false);
    });

    describe("browser not supported", () => {
      it("renders element when browser does not support network information api nor the online property", () => {
        // Arrange
        onLineGetter.mockReturnValue(undefined);
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
    describe("reactive prop is true", () => {
      it("adds event listener on created to update the connection when it changes", () => {
        // Arrange
        global.navigator.connection = {
          downlink: fastSpeed,
          addEventListener
        };

        // Act
        shallowMount(ConnectionAware, {
          propsData: { fast: true }
        });

        // Assert
        expect(addEventListener).toHaveBeenCalledWith("change", expect.any(Function)); // TODO: find a more specific assertion. Solution from https://github.com/facebook/jest/issues/6390#issuecomment-394307966
      });

      it("removes event listener on destroyed to stop updating the connection when it changes", () => {
        // Arrange
        const removeEventListener = jest.fn();

        global.navigator.connection = {
          downlink: fastSpeed,
          addEventListener,
          removeEventListener
        };

        // Act
        shallowMount(ConnectionAware, {
          propsData: { fast: true }
        }).destroy();

        // Assert
        expect(removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
      });

      describe("browser not supported", () => {
        it("does not add event listener on created to update the connection when it changes", () => {
          // Arrange
          global.navigator.connection = undefined;

          // Act & Assert
          shallowMount(ConnectionAware, {
            propsData: { fast: true }
          });
        });

        it("does not remove event listener on destroyed to stop updating the connection when it changes", () => {
          // Arrange
          global.navigator.connection = undefined;

          // Act & Assert
          shallowMount(ConnectionAware, {
            propsData: { fast: true }
          }).destroy();
        });
      });
    });

    describe("reactive prop is false", () => {
      it("does not add event listener on created to update the connection when it changes", () => {
        // Arrange
        global.navigator.connection = {
          downlink: fastSpeed,
          addEventListener
        };

        // Act
        shallowMount(ConnectionAware, {
          propsData: { fast: true, reactive: false }
        });

        // Assert
        expect(addEventListener).not.toHaveBeenCalled();
      });

      it("does not remove event listener on destroyed to stop updating the connection when it changes", () => {
        // Arrange
        const removeEventListener = jest.fn();

        global.navigator.connection = {
          downlink: fastSpeed,
          addEventListener,
          removeEventListener
        };

        // Act
        shallowMount(ConnectionAware, {
          propsData: { fast: true, reactive: false }
        }).destroy();

        // Assert
        expect(removeEventListener).not.toHaveBeenCalled();
      });

      describe("browser not supported", () => {
        it("does not add event listener on created to update the connection when it changes", () => {
          // Arrange
          global.navigator.connection = undefined;

          // Act & Assert
          shallowMount(ConnectionAware, {
            propsData: { fast: true, reactive: false }
          });
        });

        it("does not remove event listener on destroyed to stop updating the connection when it changes", () => {
          // Arrange
          global.navigator.connection = undefined;

          // Act & Assert
          shallowMount(ConnectionAware, {
            propsData: { fast: true, reactive: false }
          }).destroy();
        });
      });
    });
  });
});

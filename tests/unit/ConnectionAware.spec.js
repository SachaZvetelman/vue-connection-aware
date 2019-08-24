/* eslint-disable no-unused-labels */
import { shallowMount } from "@vue/test-utils";
import ConnectionAware from "@/components/ConnectionAware.vue";

describe("ConnectionAware.vue", () => {
  it("renders elmenent when minEffectiveType is equal to effectiveType", () => {
    // Arrange
    const minEffectiveType = "3g";
    global.navigator.connection = jest.fn(() => {
      effectiveType: "3g";
    });

    // Act
    const wrapper = shallowMount(ConnectionAware, {
      propsData: { minEffectiveType }
    });

    // Assert
    expect(wrapper.find("div").exists()).toBe(true);
  });

  it("renders elmenent when maxEffectiveType is equal to effectiveType", () => {
    // Arrange
    const maxEffectiveType = "3g";
    global.navigator.connection = jest.fn(() => {
      effectiveType: "3g";
    });

    // Act
    const wrapper = shallowMount(ConnectionAware, {
      propsData: { maxEffectiveType }
    });

    // Assert
    expect(wrapper.find("div").exists()).toBe(true);
  });

  it.each([["4g", "3g"], ["3g", "2g"], ["4g", "slow-2g"]])(
    "renders elmenent when minEffectiveType (%s) is faster than effectiveType (%s)",
    (minEffectiveType, effectiveType) => {
      // Arrange
      global.navigator.connection = jest.fn(() => {
        effectiveType;
      });

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { minEffectiveType }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(true);
    }
  );

  it.each([["3g", "4g"], ["2g", "3g"], ["slow-2g", "4g"]])(
    "renders elmenent when maxEffectiveType (%s) is slower than effectiveType (%s)",
    (maxEffectiveType, effectiveType) => {
      // Arrange
      global.navigator.connection = jest.fn(() => {
        effectiveType;
      });

      // Act
      const wrapper = shallowMount(ConnectionAware, {
        propsData: { maxEffectiveType }
      });

      // Assert
      expect(wrapper.find("div").exists()).toBe(true);
    }
  );
});

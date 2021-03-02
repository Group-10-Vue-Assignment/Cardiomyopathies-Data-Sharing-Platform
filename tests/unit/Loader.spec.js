import { shallowMount } from "@vue/test-utils";
import Loader from "@/components/Loader.vue";

describe("Loader Test", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(Loader);
  });

  afterEach(() => {
    jest.resetModules();
  });

  it("Displays div with class name 'loader'", () => {
    expect(wrapper.find(".loader").isVisible()).toBe(true);
  });
});

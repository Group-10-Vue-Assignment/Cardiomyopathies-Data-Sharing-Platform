/* eslint-disable no-undef */
import { shallowMount } from "@vue/test-utils";
import BaseSelect from "@/components/BaseSelect.vue";

describe("BaseSelect.vue Test", () => {
  it("renders message when component is created", () => {
    // render the component
    const wrapper = shallowMount(BaseSelect, {
      props: {
        title: "Test"
      }
    });

    // check the name of the component
    expect(wrapper.name()).toMatch("BaseSelect");

    // check that the title is rendered
    expect(wrapper.text()).toMatch("Test");
  });
});

import { mount } from "@vue/test-utils";
import BaseSelect from "@/components/BaseSelect.vue";

describe("BaseSelect Tests", () => {
  it("Renders each prop of BaseSelect", () => {
    const wrapper = mount(BaseSelect, {
      propsData: {
        label: "Test Label",
        modelValue: "Test",
        options: [1]
      }
    });

    const outputText = wrapper.text();
    expect(outputText).toContain("Test Label");
    expect(outputText).toContain("Test");
    expect(outputText).toContain([1]);
  });
});

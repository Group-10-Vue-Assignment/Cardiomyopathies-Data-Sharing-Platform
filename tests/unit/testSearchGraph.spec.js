import { shallowMount } from "@vue/test-utils";
import SearchGraph from "@/components/SearchGraph.vue";

describe("SearchGraph Tests", () => {
  it("Renders each prop of SearchGraph", () => {
    const wrapper = shallowMount(SearchGraph, {
      propsData: {
        cardiomyopathyTypeValue: "Test Label",
        mutatedGeneTypeValue: "Test"
      }
    });

    const outputText = wrapper.text();
    expect(outputText).toContain("Test Label");
    expect(outputText).toContain("Test");
  });
});

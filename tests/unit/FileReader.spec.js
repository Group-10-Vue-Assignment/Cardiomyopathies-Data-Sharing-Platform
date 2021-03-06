import { shallowMount } from "@vue/test-utils";
import FileReader from "@/components/FileReader.vue";

describe("FileReader Test", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(FileReader);
  });

  afterEach(() => {
    jest.resetModules();
  });

  it("Displays 'Input CSV' and input file type for the user", () => {
    expect(wrapper.text()).toMatch("Select CSV File");
    expect(wrapper.find("#graphData").isVisible()).toBe(true);
  });
});

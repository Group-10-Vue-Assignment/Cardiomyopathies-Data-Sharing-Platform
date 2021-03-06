import { shallowMount } from "@vue/test-utils";
import PageBanner from "@/components/PageBanner.vue";

describe("Page Banner Test", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(PageBanner);
  });

  afterEach(() => {
    jest.resetModules();
  });

  it("initializes with the correct materialize classes set on divs", () => {
    expect(wrapper.findAll("div")[0].attributes("class")).toBe(
      "card blue-grey darken-1"
    );
    expect(wrapper.findAll("div")[1].attributes("class")).toBe(
      "card-content white-text"
    );
    expect(wrapper.findAll("span")[0].attributes("class")).toBe("card-title");
  });
});

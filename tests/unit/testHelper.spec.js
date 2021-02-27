import { mount, shallowMount } from "@vue/test-utils";
import Helper from "../../src/views/Helper.vue";
import { GuideQuestions } from "../../src/composables/sharedData.js";

describe("Helper Tests", () => {
  it("Renders props for Helper", () => {
    const wrapper = mount(Helper);

    //Checks if application displays first and last helper questions
    expect(wrapper.text()).toContain(GuideQuestions[0].questions);

    expect(wrapper.text()).toContain(
      GuideQuestions[GuideQuestions.length - 1].questions
    );
  });
});

//checks if btn handler is working in helper
describe("Checks buttons from helper", () => {
  it("Checks if toggle btn is working", () => {
    const onClick = jest.fn();
    const wrapper = shallowMount(Helper, {
      listeners: {
        click: onClick
      }
    });
    wrapper.trigger("click");
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});

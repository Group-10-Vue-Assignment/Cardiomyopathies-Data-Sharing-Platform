import { shallowMount } from "@vue/test-utils";
import NavBar from "@/components/NavBar.vue";

describe("NavBar", () => {
  it("if non user dont show logout button", () => {
    const wrapper = shallowMount(NavBar);
    expect(wrapper.find("logout-btn").isVisible()).toBe(false);
  });

  it("if user show logout button", () => {
    const wrapper = shallowMount(NavBar);
    wrapper.setData({ user: true });
    expect(wrapper.find("logout-btn").isVisible()).toBe(true);
  });
});

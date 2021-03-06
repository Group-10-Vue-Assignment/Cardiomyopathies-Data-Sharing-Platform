import { mount } from "@vue/test-utils";
import NavBar from "@/components/NavBar.vue";

describe("NavBar Test", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = mount(NavBar);
  });

  afterEach(() => {
    jest.resetModules();
  });

  it("Displays the correct navbar for logged out users", () => {
    expect(wrapper.findAll(".brand-logo")[0].isVisible()).toBe(true);
    expect(wrapper.find("#nonuser-help-test-identifier").attributes("to")).toBe(
      "/helper"
    );
    expect(wrapper.find("#nonuser-home-test-identifier").attributes("to")).toBe(
      "/"
    );
    expect(
      wrapper.find("#nonuser-login-test-identifier").attributes("to")
    ).toBe("/login");
    expect(
      wrapper.find("#nonuser-signup-test-identifier").attributes("to")
    ).toBe("/signup");
    expect(
      wrapper.find("#nonuser-forgot-password-test-identifier").attributes("to")
    ).toBe("/forgotpassword");
  });

  // We cannot set the user variable with setData(), as we are using the composition API.
  // This means we cannot actually test the navbar for logged in users (with our existing implementation)
  // unless we switch to the options API.
  // Just to test this, i have switched v-if, for v-show, in the NavBar.vue functionality
  it("Displays the correct navbar for logged in users", () => {
    // As explained above, we are using v-show, so it should exist but not be visible
    expect(wrapper.find(".user-items").isVisible()).toBe(false);
    expect(wrapper.findAll(".brand-logo")[1].exists()).toBe(true);
    expect(wrapper.find("#user-help-test-identifier").attributes("to")).toBe(
      "/helper"
    );
    expect(wrapper.find("#user-home-test-identifier").attributes("to")).toBe(
      "/"
    );
    expect(
      wrapper.find("#user-gdashboard-test-identifier").attributes("to")
    ).toBe("/global-dashboard");
    expect(
      wrapper.find("#user-udashboard-test-identifier").attributes("to")
    ).toBe("/user-dashboard");
    expect(
      wrapper.find("#user-sdashboard-test-identifier").attributes("to")
    ).toBe("/search-dashboard");
    expect(
      wrapper.find("#user-add-graph-test-identifier").attributes("to")
    ).toBe("/add-graph");
  });
});

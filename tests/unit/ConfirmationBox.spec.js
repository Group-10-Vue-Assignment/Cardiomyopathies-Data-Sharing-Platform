import { shallowMount } from "@vue/test-utils";
import ConfirmationBox from "@/components/ConfirmationBox.vue";

describe("Confirmation Box Test", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(ConfirmationBox);
  });

  afterEach(() => {
    jest.resetModules();
  });

  it("initializes with the correct elements on screen", () => {
    let deleteButton = wrapper.find("button");
    expect(deleteButton.isVisible()).toBe(true);
    expect(deleteButton.text()).toMatch("Delete");

    // I dont think we can test if the modal is visible or not, as
    // We are using materialize, so rather than testing materialize
    // We can ensure our data-target and id link is not broken
    expect(deleteButton.attributes("data-target")).toBe("deleteModal");

    let deleteModal = wrapper.find(".modal");
    expect(deleteModal.attributes("id")).toBe("deleteModal");
  });

  it("emits an event when yes confirmation is clicked in modal", () => {
    wrapper.find("#delete-confirmed-test").trigger("click");

    expect(wrapper.emitted("deleteGraph")).toBeTruthy();
    expect(wrapper.emitted("deleteGraph").length).toBe(1);
  });
});

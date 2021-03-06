import UserInformation from "@/components/UserInformation.vue";
import getUserDetails from "@/firebaseFunctions/getUserDetails.js";
import { mountSuspense } from "@/composables/MountSuspenseHelper";

jest.mock("@/firebaseFunctions/getUserDetails.js");

describe("UserInformation Test", () => {
  let wrapper = null;

  let userDetailsResponse = {};

  beforeEach(async () => {
    userDetailsResponse = {
      name: "testing name",
      institution: "Manchester Metropolitan University"
    };

    getUserDetails.mockResolvedValue(userDetailsResponse);

    // we will get warnings that props were not set, but thats fine as we are not testing props
    // Also, if we were to test props, the second parameter of mountSuspense needs to be figured out.
    // There is little documentation on how to test components that use async setup.
    // This is because it is still a new experimental feature.
    wrapper = await mountSuspense(UserInformation);
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("renders UserInformation data to the screen in correct format", async () => {
    expect(getUserDetails).toHaveBeenCalledTimes(1);
    expect(wrapper.text()).toMatch(
      "Hello " +
        userDetailsResponse.name +
        " from " +
        userDetailsResponse.institution +
        ", these are your user details and available graph data."
    );
  });
});

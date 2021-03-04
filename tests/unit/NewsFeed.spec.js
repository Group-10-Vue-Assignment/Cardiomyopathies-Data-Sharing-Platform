import NewsFeed from "@/components/NewsFeed.vue";
import NewsFeedService from "@/services/NewsFeedService.js";
import { mountSuspense } from "@/composables/MountSuspenseHelper";

jest.mock("@/services/NewsFeedService.js");

describe("NewsFeed Test", () => {
  let wrapper = null;

  let NewsFeedResponse = {};

  beforeEach(async () => {
    NewsFeedResponse = {
      data: {
        items: [
          {
            title:
              "Loss of functions in the PLD1 gene causes congenital heart disease",
            description:
              "A team of researchers co-led by Michael Frohman, MD, PhD, of Stony Brook Uni...",
            pubDate: "2021-03-02 05:34:00",
            enclosure: {
              link:
                "https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2014/7/Heart_Disease-620x480.jpg"
            },
            link:
              "https://www.news-medical.net/news/20210226/New-approach-can-help-treat-hypertrophic-cardiomyopathy-with-precision-medicine.aspx"
          },
          {
            title:
              "New approach can help treat hypertrophic cardiomyopathy with precision medicine",
            description:
              "Hypertrophic cardiomyopathy (HCM) is a cardiovascular disease characterized by thickening...",
            pubDate: "2021-02-26 06:17:10",
            enclosure: {
              link:
                "https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2014/9/heart_disease_1_12c3ff20f43b43d898bf18f5689e0c7c-620x480.jpg"
            },
            link:
              "https://www.news-medical.net/news/20210302/Loss-of-functions-in-the-PLD1-gene-causes-congenital-heart-disease.aspx"
          }
        ]
      }
    };

    NewsFeedService.getNewsFeed.mockResolvedValue(NewsFeedResponse);

    // we will get warnings that props were not set, but thats fine as we are not testing props
    // Also, if we were to test props, the second parameter of mountSuspense needs to be figured out.
    // There is little documentation on how to test components that use async setup.
    // This is because it is still a new experimental feature.
    wrapper = await mountSuspense(NewsFeed);
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("renders NewsFeed data to the screen in correct format", async () => {
    expect(NewsFeedService.getNewsFeed).toHaveBeenCalledTimes(1);
    expect(wrapper.findAll("h5")[0].text()).toMatch(
      NewsFeedResponse.data.items[0].title
    );
    expect(wrapper.findAll("blockquote")[0].text()).toMatch(
      NewsFeedResponse.data.items[0].description
    );
    expect(wrapper.findAll("p")[0].text()).toMatch(
      "Published on: " + NewsFeedResponse.data.items[0].pubDate.substr(0, 10)
    );
    expect(wrapper.findAll("a")[0].attributes("href")).toMatch(
      NewsFeedResponse.data.items[0].link
    );
    expect(wrapper.findAll("img")[0].attributes("src")).toMatch(
      NewsFeedResponse.data.items[0].enclosure.link
    );

    expect(wrapper.findAll("h5")[1].text()).toMatch(
      NewsFeedResponse.data.items[1].title
    );
    expect(wrapper.findAll("blockquote")[1].text()).toMatch(
      NewsFeedResponse.data.items[1].description
    );
    expect(wrapper.findAll("p")[1].text()).toMatch(
      "Published on: " + NewsFeedResponse.data.items[1].pubDate.substr(0, 10)
    );
    expect(wrapper.findAll("a")[1].attributes("href")).toMatch(
      NewsFeedResponse.data.items[1].link
    );
    expect(wrapper.findAll("img")[1].attributes("src")).toMatch(
      NewsFeedResponse.data.items[1].enclosure.link
    );
  });
});

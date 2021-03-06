import ExternalInformation from "@/components/ExternalInformation.vue";
import NCBIService from "@/services/NCBIService.js";
import HBOService from "@/services/HBOService.js";
import OMIMService from "@/services/OMIMService.js";
import { mountSuspense } from "@/composables/MountSuspenseHelper";

jest.mock("@/services/NCBIService.js");
jest.mock("@/services/HBOService.js");
jest.mock("@/services/OMIMService.js");

describe("External Information Test", () => {
  let wrapper = null;

  let NCBIServiceResponse = {};
  let HBOServiceResponse = {};
  let OMIMServiceResponse = {};
  beforeEach(async () => {
    NCBIServiceResponse = {
      name: "TNNT2",
      description: "troponin T2, cardiac type",
      summary: "The protein encoded by this gene is the tropomyosin-binding...."
    };
    HBOServiceResponse = {
      data: {
        disease: {
          diseaseName: "Cardiomyopathy, Familial Hypertrophic"
        },
        catTermsMap: [
          {},
          {
            catLabel: "Cardiovascular",
            terms: [
              {
                name: "Arrhythmia",
                definition:
                  "Any cardiac rhythm other than the normal sinus rhythm. Such a rhythm..."
              },
              {
                name: "Asymmetric septal hypertrophy",
                definition:
                  "Hypertrophic cardiomyopathy with an asymmetrical pattern of hypertrophy..."
              }
            ]
          }
        ]
      }
    };
    OMIMServiceResponse = {
      data: {
        omim: {
          entryList: [
            {
              entry: {
                phenotypeMapList: [
                  {
                    phenotypeMap: {
                      phenotype: "Cardiomyopathy, familial hypertrophic",
                      geneSymbols: "CAV3, LQT9, MPDT, RMD2"
                    }
                  },
                  {
                    phenotypeMap: {
                      phenotype: "Cardiomyopathy, hypertrophic, 1",
                      geneSymbols: "MYH7, CMH1, MPD1, CMD1S, SPMM, SPMD"
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    };
    NCBIService.getGeneInformation.mockResolvedValue(NCBIServiceResponse);
    HBOService.getClinicalSynopsis.mockResolvedValue(HBOServiceResponse);
    OMIMService.getPhenotypes.mockResolvedValue(OMIMServiceResponse);

    // we will get warnings that props were not set, but thats fine as we are not testing props
    // Also, if we were to test props, the second parameter of mountSuspense needs to be figured out.
    // There is little documentation on how to test components that use async setup.
    // This is because it is still a new experimental feature.
    wrapper = await mountSuspense(ExternalInformation);
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("renders NCBIService data to the screen in correct format", async () => {
    expect(NCBIService.getGeneInformation).toHaveBeenCalledTimes(1);
    expect(wrapper.findAll("h5")[0].text()).toMatch(
      NCBIServiceResponse.description + ", " + NCBIServiceResponse.name
    );
    expect(wrapper.findAll("h5")[1].text()).toMatch(
      NCBIServiceResponse.name + " Description"
    );
    expect(wrapper.findAll("p")[0].text()).toMatch(NCBIServiceResponse.summary);
  });

  it("renders HBOService data to the screen in correct format", async () => {
    expect(HBOService.getClinicalSynopsis).toHaveBeenCalledTimes(1);
    expect(wrapper.findAll("h5")[2].text()).toMatch(
      "Disease Name: " + HBOServiceResponse.data.disease.diseaseName
    );
    expect(wrapper.findAll("h5")[3].text()).toMatch(
      HBOServiceResponse.data.catTermsMap[1].catLabel + " Clinical Synopsis"
    );

    // Not sure if we can iterate like v-for. Below is checking if the v-for rendered dynamically with the right data
    expect(wrapper.findAll("p")[1].text()).toMatch(
      HBOServiceResponse.data.catTermsMap[1].terms[0].name
    );

    expect(wrapper.findAll("p")[2].text()).toMatch(
      HBOServiceResponse.data.catTermsMap[1].terms[0].definition
    );

    expect(wrapper.findAll("p")[3].text()).toMatch(
      HBOServiceResponse.data.catTermsMap[1].terms[1].name
    );

    expect(wrapper.findAll("p")[4].text()).toMatch(
      HBOServiceResponse.data.catTermsMap[1].terms[1].definition
    );
  });

  it("renders OMIMService data to the screen in correct format", async () => {
    expect(OMIMService.getPhenotypes).toHaveBeenCalledTimes(1);
    expect(wrapper.findAll("h5")[4].text()).toMatch("Phenotypes");
    expect(wrapper.findAll("p")[5].text()).toMatch(
      OMIMServiceResponse.data.omim.entryList[0].entry.phenotypeMapList[0]
        .phenotypeMap.phenotype
    );
    expect(wrapper.findAll("p")[6].text()).toMatch(
      OMIMServiceResponse.data.omim.entryList[0].entry.phenotypeMapList[0]
        .phenotypeMap.geneSymbols
    );

    expect(wrapper.findAll("p")[7].text()).toMatch(
      OMIMServiceResponse.data.omim.entryList[0].entry.phenotypeMapList[1]
        .phenotypeMap.phenotype
    );

    expect(wrapper.findAll("p")[8].text()).toMatch(
      OMIMServiceResponse.data.omim.entryList[0].entry.phenotypeMapList[1]
        .phenotypeMap.geneSymbols
    );
  });
});

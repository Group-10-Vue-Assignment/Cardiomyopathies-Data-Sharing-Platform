import { mount } from "@vue/test-utils";
import LineChart from "@/components/LineChart.vue";
import VueApexCharts from "vue3-apexcharts";

describe("LineChart Test", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = mount(LineChart, {
      propsData: {
        graphInformation: {
          experimentalData:
            '{"xPlots":[0.0637,0.1911,5.1911,7.4522,7.5159,9.1083,10.4459,10.5096,12.1975,13.4395,13.4713,16.4331,16.4968,17.8025,19.3631,19.6497,22.3567,22.4841,26.1465,26.465,29.9045,29.9363],"yPlots":[{"yDataName":"1.8 um","yPlots":[0.195,0.199,0.378,0.52,0.526,0.797,1.691,1.756,3.933,6.244,6.314,14.51,14.699,18.371,21.854,22.334,24.846,24.912,26.146,26.195,26.276,26.275]},{"yDataName":"2.2 um","yPlots":[0.114,0.13,0.715,1.129,1.171,2.732,4.224,4.358,9.236,13.669,13.789,24.846,25.08,29.073,31.577,31.935,34.025,34.081,35.015,35.057,35.252,35.252]}]}',
          typeOfData: "Sarcomere Length vs Time",
          xAxisTitle: "Time (Sec)",
          yTickAmount: 7,
          yAxisTitle: "Sarcomere Length (µm)",
          roundYAxisDP: 2
        }
      },
      global: {
        plugins: [VueApexCharts]
      }
    });
  });

  afterEach(() => {
    jest.resetModules();
  });

  it("Displays Apex Charts Graph", () => {
    expect(wrapper.find(".vue-apexcharts").isVisible()).toBe(true);
  });
});

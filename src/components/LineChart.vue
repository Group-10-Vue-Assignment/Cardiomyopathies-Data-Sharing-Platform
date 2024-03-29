<template>
  <apexchart
    class="center"
    type="line"
    height="350"
    width="500"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    graphInformation: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    let graphInformation = ref(props.graphInformation);

    let experimentalData = JSON.parse(graphInformation.value.experimentalData);
    let xPlots = ref(experimentalData.xPlots);
    let yPlots = ref(experimentalData.yPlots);

    const chartOptions = ref({
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: graphInformation.value.typeOfData,
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: xPlots,
        type: "numeric",
        title: {
          text: graphInformation.value.xAxisTitle
        }
      },
      yaxis: {
        // tick (how many plots on axis, - 1 to actually make what user wanted)
        tickAmount: graphInformation.value.yTickAmount - 1,
        title: {
          text: graphInformation.value.yAxisTitle
        },
        labels: {
          show: true,
          formatter: val => val.toFixed(graphInformation.value.roundYAxisDP)
        }
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5
      },
      responsive: [
        {
          breakpoint: 774,
          options: {
            chart: {
              width: "100%"
            }
          }
        }
      ]
    });
    const series = ref([]);

    yPlots.value.forEach(line => {
      series.value.push({
        name: line.yDataName,
        data: line.yPlots
      });
    });

    return { chartOptions, series };
  }
};
</script>

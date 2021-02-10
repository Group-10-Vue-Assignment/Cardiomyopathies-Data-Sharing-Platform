<template>
  <div>
    <apexchart
      type="line"
      height="350"
      width="500"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import { ref } from "vue";
import { graphsCollection } from "@/firebase/config";

export default {
  props: {
    graph: {
      type: Object,
      required: true
    }
  },
  async setup(props) {
    let yPlots = ref(await getYPlotsForGraph(props.graph.graphId));
    let xPlots = ref(props.graph.graphInformation.xPlots);
    let graphInformation = ref(props.graph.graphInformation);

    async function getYPlotsForGraph(graphId) {
      let plots = [];
      await graphsCollection
        .doc(graphId)
        .collection("yPlots")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            plots.push(doc.data());
          });
        });
      return plots;
    }

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
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: xPlots,
        // tick (how many plots on axis, - 1 to actually make what user wanted)
        tickAmount: graphInformation.value.xTickAmount - 1,
        type: "numeric",
        title: {
          text: graphInformation.value.xAxisTitle
        }
      },
      yaxis: {
        min: 1.6,
        max: 1.9,
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
      }
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

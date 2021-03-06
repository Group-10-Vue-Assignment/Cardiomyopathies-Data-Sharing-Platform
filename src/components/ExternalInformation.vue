<template>
  <div class="centered-api-info grey-text">
    <div v-if="externalGeneInformation" class="row card">
      <h5 class="white-text card-panel blue-grey">
        {{ externalGeneInformation.description }},
        {{ externalGeneInformation.name }}
      </h5>
      <div class="content">
        <h5>{{ externalGeneInformation.name }} Description</h5>
        <p>{{ externalGeneInformation.summary }}</p>
      </div>
    </div>
    <div v-if="externalClinicalSynopsisInformation" class="row card">
      <h5 class="white-text card-panel blue-grey">
        Disease Name:
        {{ externalClinicalSynopsisInformation.data.disease.diseaseName }}
      </h5>

      <div class="content">
        <h5>
          {{ externalClinicalSynopsisInformation.data.catTermsMap[1].catLabel }}
          Clinical Synopsis
        </h5>

        <div
          v-for="(clinicalSynopsis,
          index) in externalClinicalSynopsisInformation.data.catTermsMap[1]
            .terms"
          :key="index"
        >
          <p>
            <b>{{ clinicalSynopsis.name }}</b>
          </p>
          <p>{{ clinicalSynopsis.definition }}</p>
        </div>
      </div>
    </div>
    <div v-if="externalPhenotypeInformation" class="row card">
      <h5 class="white-text card-panel blue-grey">Phenotypes</h5>
      <div
        v-for="(element, index) in externalPhenotypeInformation.data.omim
          .entryList[0].entry.phenotypeMapList"
        :key="index"
        class="content"
      >
        <p>
          <b>{{ element.phenotypeMap.phenotype }}</b>
        </p>
        <p>Gene Symbols: {{ element.phenotypeMap.geneSymbols }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import NCBIService from "@/services/NCBIService.js";
import HBOService from "@/services/HBOService.js";
import OMIMService from "@/services/OMIMService.js";

export default {
  emits: ["externalDataLoaded"],
  props: {
    chosenMutatedGeneType: {
      type: String,
      required: true
    },
    chosenCardiomyopathyType: {
      type: String,
      required: true
    }
  },
  async setup(props, context) {
    let externalGeneInformation = await NCBIService.getGeneInformation(
      props.chosenMutatedGeneType
    );

    let externalClinicalSynopsisInformation = await HBOService.getClinicalSynopsis(
      props.chosenMutatedGeneType,
      props.chosenCardiomyopathyType
    );

    let externalPhenotypeInformation = await OMIMService.getPhenotypes(
      props.chosenMutatedGeneType,
      props.chosenCardiomyopathyType
    );

    context.emit("externalDataLoaded");
    return {
      externalGeneInformation,
      externalClinicalSynopsisInformation,
      externalPhenotypeInformation
    };
  }
};
</script>

<style scoped>
.centered-api-info {
  margin-left: auto;
  margin-right: auto;
  width: 85%;
  position: relative;
}

.content {
  padding: 60px;
  padding-top: 10px;
}
</style>

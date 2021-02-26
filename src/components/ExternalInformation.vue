<template>
  <div v-if="externalGeneInformation">
    <h3>
      {{ externalGeneInformation.description }},
      {{ externalGeneInformation.name }}
    </h3>
    <h5>{{ externalGeneInformation.name }} Description</h5>
    <p>{{ externalGeneInformation.summary }}</p>
  </div>
  <div v-if="externalClinicalSynopsisInformation">
    <h3>
      Disease Name:
      {{ externalClinicalSynopsisInformation.data.disease.diseaseName }}
    </h3>
    <h5>
      {{ externalClinicalSynopsisInformation.data.catTermsMap[1].catLabel }}
      Clinical Synopsis
    </h5>
    <div
      v-for="(clinicalSynopsis, index) in externalClinicalSynopsisInformation
        .data.catTermsMap[1].terms"
      :key="index"
    >
      <p>
        <b>{{ clinicalSynopsis.name }}</b>
      </p>
      <p>{{ clinicalSynopsis.definition }}</p>
    </div>
  </div>
  <div v-if="externalPhenotypeInformation">
    <h3>Phenotypes</h3>
    <div
      v-for="(element, index) in externalPhenotypeInformation.data.omim
        .entryList[0].entry.phenotypeMapList"
      :key="index"
    >
      <p>
        <b>{{ element.phenotypeMap.phenotype }}</b>
      </p>
      <p>Gene Symbols: {{ element.phenotypeMap.geneSymbols }}</p>
    </div>
  </div>
</template>

<script>
import NCBIService from "@/services/NCBIService.js";
import HBOService from "@/services/HBOService.js";
import OMIMService from "@/services/OMIMService.js";

export default {
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
  async setup(props) {
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

    return {
      externalGeneInformation,
      externalClinicalSynopsisInformation,
      externalPhenotypeInformation
    };
  }
};
</script>

<style></style>

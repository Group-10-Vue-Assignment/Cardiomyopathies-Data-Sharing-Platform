<template>
  <div class="info-container">
    <label>mimNumber:</label>
    {{ entry.phenotypeMapList[0].phenotypeMap.mimNumber }}
    <label>clinicalSynopsis</label>:
    {{ entry.clinicalSynopsis.inheritance }}
    <label>Phenotype:</label>
    {{ entry.phenotypeMapList[0].phenotypeMap.phenotype }}
    <div>
      <label>Gene:</label>
      {{ entry.phenotypeMapList[0].phenotypeMap.geneSymbols }}
      <h1>Text</h1>
      {{ entry.textSectionList[0].textSection.textSectionContent }}
    </div>
    <div>
      {{ entry.phenotypeMapList[0].phenotypeMap.phenotypeMappingKey }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["entry"]
};
</script>

<style>
.info-container {
  padding: 10px;
  background-color: chartreuse;
  margin: 5px;
}
</style>

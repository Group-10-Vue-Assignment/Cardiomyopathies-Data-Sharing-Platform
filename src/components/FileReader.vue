<template>
  <label class="text-reader" for="graphData">
    Input CSV
    <input
      type="file"
      id="graphData"
      @change="loadDataFromFile"
      accept=".csv"
      tabindex="-1"
    />
  </label>
</template>

<script>
export default {
  emits: ["load"],
  setup(props, context) {
    // If we need to reset the data in input for some reason, we need to attach ref to element
    //const graphData = ref("test")
    function loadDataFromFile(e) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = e => context.emit("load", e.target.result);
      reader.readAsText(file);

      //graphData.value = ''
    }

    return { loadDataFromFile };
  }
};
</script>

<style scoped>
.text-reader {
  position: relative;
  overflow: hidden;
  display: inline-block;

  /* Fancy button style 😎 */
  border: 2px solid black;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
}
.text-reader input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
}
</style>

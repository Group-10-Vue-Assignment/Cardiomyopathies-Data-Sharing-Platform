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
    function loadDataFromFile(e) {
      const file = e.target.files[0];
      if (isValidFileType(file)) {
        const reader = new FileReader();
        reader.onload = e => context.emit("load", e.target.result);
        reader.readAsText(file);
      } else {
        //display error notification about wrong file type
      }
      e.target.value = "";
    }

    function isValidFileType(file) {
      // removed "text/plain", unsure if some "csv" files are classed as text/plain
      // in certain browsers.
      const validFileTypes = [
        "application/vnd.ms-excel",
        "text/x-csv",
        "application/csv",
        "application/x-csv",
        "text/comma-separated-values",
        "text/x-comma-separated-values"
      ];

      for (const fileType of validFileTypes) {
        if (file.type == fileType) {
          console.log(file);
          return true;
        }
      }
      return false;
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

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
import { useStore } from "vuex";

export default {
  emits: ["load", "filename"],
  setup(props, context) {
    const store = useStore();

    function loadDataFromFile(e) {
      const file = e.target.files[0];

      let notification = {};
      if (isValidFileType(file)) {
        context.emit("filename", file.name);
        const reader = new FileReader();
        reader.onload = e => context.emit("load", e.target.result);
        reader.readAsText(file);
      } else {
        notification = {
          type: "error",
          message: "Wrong file type selected! Please select a CSV file"
        };
        store.dispatch("addNotification", notification);
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
      let extensionType = file.name.split(".").pop();

      for (const fileType of validFileTypes) {
        if (file.type == fileType) {
          return true;
        }
      }
      if (extensionType == "csv") {
        return true;
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

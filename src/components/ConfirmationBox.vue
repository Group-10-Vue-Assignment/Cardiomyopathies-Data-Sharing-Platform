<template>
  <button
    data-target="deleteModal"
    class="waves-effect waves-light btn-small red lighten-2 modal-trigger"
  >
    Delete
  </button>

  <div id="deleteModal" class="modal">
    <div class="modal-content">
      <h4>Confirmation</h4>
      <p>Are you sure you wish to delete this graph?</p>
    </div>
    <div class="modal-footer">
      <a class="modal-close waves-effect waves-red btn-flat">No</a>
      <a
        class="modal-close waves-effect waves-green btn-flat"
        @click="$emit('deleteGraph')"
        >Yes</a
      >
    </div>
  </div>
</template>

<script>
import M from "materialize-css";
import { onMounted } from "vue";
export default {
  emits: ["deleteGraph"],
  setup() {
    onMounted(() => {
      M.AutoInit();
    });
  }
};
</script>

<style scoped></style>

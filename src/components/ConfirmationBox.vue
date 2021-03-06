<template>
  <button
    data-target="deleteModal"
    class="waves-effect waves-light btn-small red lighten-2 modal-trigger"
  >
    Delete <i class="material-icons right">delete</i>
  </button>

  <div id="deleteModal" class="modal">
    <div class="modal-content">
      <h4 class="card-panel blue-grey darken-1 white-text">
        Delete Confirmation
      </h4>
      <p>Are you sure you want to delete this graph?</p>
    </div>
    <div class="modal-footer">
      <a
        id="delete-confirmed-test"
        class="modal-close waves-effect green darken-1 btn-small"
        @click="$emit('deleteGraph')"
      >
        Yes </a
      >⠀
      <a class="modal-close waves-effect red lighten-2 btn-small">No</a>
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

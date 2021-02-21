<template>
  <h1>more info about the graphs</h1>

  <div v-for="Entry in showData" :key="Entry.mimNumber">
    <Info :entry="Entry.entry" />
  </div>
</template>

<script>
import Info from "../components/Info.vue";
export default {
  components: { Info },
  setup() {}
};
</script>

<style></style>

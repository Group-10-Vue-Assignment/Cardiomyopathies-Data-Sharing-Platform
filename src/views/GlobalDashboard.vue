<template>
  <h1>Global Dashboard</h1>
  <h3>Graphs created by everyone</h3>

  <div>
    <Suspense>
      <template #default>
        <GlobalGraph />
      </template>
      <template #fallback>
        <Loader />
      </template>
    </Suspense>
  </div>
</template>

<script>
import GlobalGraph from "@/components/GlobalGraph.vue";
import Loader from "../components/Loader.vue";

export default {
  components: {
    GlobalGraph,
    Loader
  },
  async setup() {}
};
</script>

<style>
h1 {
  padding: 0.5%;
}
.userDetails {
  padding: 0.5%;
}
</style>

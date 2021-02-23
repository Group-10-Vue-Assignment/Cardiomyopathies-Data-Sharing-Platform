<template>
  <div class="col s6 m6">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <span class="card-title">Global Dashboard</span>
        <p>
          The graphs generated on this page are the ones that have been created
          by other people.
        </p>
      </div>
    </div>
  </div>
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
.userDetails {
  color: white;
}
</style>

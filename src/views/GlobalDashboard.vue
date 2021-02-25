<template>
  <PageBanner>
    <template v-slot:title>Global Dashboard</template>
    <template v-slot:description>
      This dashboard displays graphs created by all users, sorted by newest
      first.
    </template>
  </PageBanner>
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
import PageBanner from "@/components/PageBanner.vue";
export default {
  components: {
    GlobalGraph,
    Loader,
    PageBanner
  },
  async setup() {}
};
</script>

<style>
.userDetails {
  color: white;
}
</style>

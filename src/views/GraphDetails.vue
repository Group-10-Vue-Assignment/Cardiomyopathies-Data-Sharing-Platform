<template>
  <PageBanner>
    <template v-slot:title>Graph Details</template>
    <template v-slot:description>
      Viewing specific experimental data stored on our systems
    </template>
  </PageBanner>
  <Suspense>
    <template #default>
      <DetailGraph :id="id" />
    </template>
    <template #fallback>
      <Loader />
    </template>
  </Suspense>
</template>

<script>
import DetailGraph from "@/components/DetailGraph.vue";
import Loader from "../components/Loader.vue";
import PageBanner from "@/components/PageBanner.vue";
export default {
  components: {
    DetailGraph,
    Loader,
    PageBanner
  },
  props: {
    id: {
      type: String,
      required: true
    }
  }
};
</script>

<style>
.center {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
</style>

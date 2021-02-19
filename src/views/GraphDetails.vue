<template>
  <h1>Graph Details</h1>
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
export default {
  components: {
    DetailGraph,
    Loader
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

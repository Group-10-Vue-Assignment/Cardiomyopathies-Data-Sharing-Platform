<template>
  <PageBanner>
    <template v-slot:title>Page Not Found</template>
    <template v-slot:description>
      The page you have tried searching for does not exist.
    </template>
  </PageBanner>
</template>

<script>
import PageBanner from "@/components/PageBanner.vue";

export default {
  name: "PageNotFound",
  components: {
    PageBanner
  }
};
</script>

<style></style>

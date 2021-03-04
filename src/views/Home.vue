<template>
  <PageBanner>
    <template v-slot:title>Home Page</template>
    <template v-slot:description>
      Welcome to the cardiomyopathies data sharing platform (CDSP) homepage.
      Here you will find a deeper understanding of the different types of
      cardiomyopathy. We feature a newsfeed with external article links for
      further reading.
    </template>
  </PageBanner>

  <div class="row">
    <div class="col">
      <Suspense>
        <template #default>
          <NewsFeed />
        </template>
        <template #fallback>
          <Loader />
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script>
import PageBanner from "@/components/PageBanner.vue";
import NewsFeed from "@/components/NewsFeed.vue";
import Loader from "@/components/Loader.vue";

export default {
  name: "Home",
  components: {
    PageBanner,
    NewsFeed,
    Loader
  }
};
</script>

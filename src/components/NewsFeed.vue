<template>
  <div v-for="items in newsFeedData.items" :key="items">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <span class="card-title"> {{ items.title }} </span>
        <p>{{ items.description }}</p>
        <p>Published on: {{ items.pubDate }}</p>
      </div>
      <div class="card-action">
        <a :href="items.link">Source Article</a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  async setup() {
    const newsFeedData = ref([]);

    const apiData = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.news-medical.net%2Ftag%2Ffeed%2FCardiomyopathy.aspx`
    );

    let data = await apiData.json();

    newsFeedData.value = data;

    return {
      newsFeedData
    };
  }
};
</script>

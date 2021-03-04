<template>
  <div v-for="items in newsFeedData.items" :key="items">
    <div class="row card z-depth-3">
      <div class="col s12 card-content grey lighten-2">
        <h5>{{ items.title }}</h5>
        <div class="col s8">
          <blockquote>{{ items.description }}</blockquote>
          <i>Published on: {{ items.pubDate }}</i>
        </div>
        <div class="col s4">
          <img
            class="responsive-img z-depth-2"
            height="200"
            width="200"
            :src="items.enclosure.link"
          />
        </div>
      </div>
      <div class="col s12 card-action grey lighten-1">
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

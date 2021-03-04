<template>
  <div v-for="(items, index) in newsFeedData.items" :key="index">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <span class="card-title">
          {{ items.title }}
        </span>
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
import NewsFeedService from "@/services/NewsFeedService.js";

export default {
  async setup() {
    let newsFeedData = await NewsFeedService.getNewsFeed();

    newsFeedData = newsFeedData.data;
    console.log(newsFeedData);
    return {
      newsFeedData
    };
  }
};
</script>

<template>
  <div v-for="items in newsFeedData.items" :key="items" class="feed-container">
    <div class="row card z-depth-3">
      <div class="col s12 card-action blue-grey lighten-1 white-text">
        <p class="right-align date">
          Published on: {{ items.pubDate.substr(0, 10) }}
        </p>
      </div>
      <div class="col s12 card-content blue-grey darken-1 white-text">
        <div class="col s4">
          <img class="responsive-img z-depth-2" :src="items.enclosure.link" />
        </div>
        <div class="col s8">
          <h5 class="left-align">{{ items.title }}</h5>
          <blockquote class="left-align ">{{ items.description }}</blockquote>

          <div class="sourceBtn">
            <a
              class="btn valign-wrapper blue-grey lighten-1"
              :href="items.link"
              target="article"
              id="link-test-identifer"
              >Source Article</a
            >
          </div>
        </div>
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

    return {
      newsFeedData
    };
  }
};
</script>

<style scoped>
.feed-container {
  padding: 0 120px;
}

.sourceBtn {
  display: flex;
  align-items: flex-start;
  margin-right: auto;
}

blockquote {
  border-left: 5px solid #ffffff;
}

.date {
  font-style: italic;
}
</style>

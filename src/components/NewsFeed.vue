<template>
  <div v-for="items in newsFeedData.items" :key="items" class="feed-container">
    <div class="row card z-depth-3">
      <div class="col s12 card-action blue-grey lighten-1 white-text">
        <p class="right-align date">
          Published on: {{ items.pubDate.substr(0, 10) }}
        </p>
      </div>
      <div class="col s12 card-content grey lighten-2">
        <div class="col s4">
          <img class="responsive-img z-depth-2" :src="items.enclosure.link" />
        </div>
        <div class="col s8">
          <h5 class="left-align">{{ items.title }}</h5>
          <blockquote class="left-align ">{{ items.description }}</blockquote>

          <div class="sourceBtn">
            <a class="btn valign-wrapper blue-grey lighten-1" :href="items.link"
              >Source Article</a
            >
          </div>
        </div>
      </div>
      <!--
      <div class="col s12 card-action grey lighten-1">
        <a :href="items.link">Source Article</a>
      </div>
      -->
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
    console.log(newsFeedData);

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
  border-left: 5px solid #78909c;
}

.date {
  font-style: italic;
}
</style>

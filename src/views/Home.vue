<template>
  <PageBanner>
    <template v-slot:title>Home</template>
    <template v-slot:description>
      <i>
        Cardiomyopathy is a general term for diseases of the heart muscle, where
        the walls of the heart chambers have become stretched, thickened or
        stiff. This affects the heart's ability to pump blood around the body.
      </i>
    </template>
  </PageBanner>

  <div class="row">
    <div class="col s4 m4">
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
    </div>

    <div class="col s8 m8">
      <img
        src="https://th.bing.com/th/id/Raff457c45a3c0529dfb7aa3e621c4761?rik=INC2goEiftfGlQ&riu=http%3a%2f%2fwww.secondscount.org%2fimage.axd%3fid%3dc690e631-5670-4ebf-9874-b359a1947faf%26t%3d635776851219130000&ehk=Bb3GdTOGrHNAOq9sngvKVyljipE1B8hKHuTput6045E%3d&risl=&pid=ImgRaw"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import PageBanner from "@/components/PageBanner.vue";

export default {
  name: "Home",
  components: {
    PageBanner
  },
  async setup() {
    const newsFeedData = ref([]);

    const newsFeed = async () => {
      const apiData = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.news-medical.net%2Ftag%2Ffeed%2FCardiomyopathy.aspx`
      );

      let data = await apiData.json();
      console.log(data);
      newsFeedData.value = data;
    };
    newsFeed();

    return {
      newsFeed,
      newsFeedData
    };
  }
};
</script>

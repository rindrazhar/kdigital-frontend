<template>
  <div>
    <span v-if="load">Loading...</span>
    <div v-for="story in stories" :key="story.id">
      <router-link :to="{ path: '/story/' + story.data.id }">
        <h2>{{ story.data.title }}</h2>
      </router-link>
      <p>Score: {{ story.data.score }}</p>
      <p>{{ story.data.descendants }} comments</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "home",

  data() {
    return {
      err: "",
      stories: [],
      load: false,
    };
  },

  methods: {
    getDataTopNews() {
      this.load = true;
      axios
        .get("https://hacker-news.firebaseio.com/v0/topstories.json")
        .then((res) => {
          this.resultsNews = res.data.slice(0, 20);
          this.resultsNews.forEach((data) => {
            axios
              .get(
                "https://hacker-news.firebaseio.com/v0/item/" + data + ".json"
              )
              .then((res) => {
                this.stories.push(res);
                // console.log(this.stories);
                this.load = false;
              })
              .catch((err) => {
                console.log(err);
              });
          });
        })
        .catch((err) => {
          this.err = err;
        });
    },
  },

  created() {
    this.getDataTopNews();
  },
};
</script>

<style></style>

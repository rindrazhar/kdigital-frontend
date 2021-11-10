<template>
  <div class="container">
    <div class="wrap__top">
      <span v-if="load">Loading...</span>
      <h2>{{ story.title }}</h2>
      <p>Author Url: {{ story.url }}</p>
      <p>By: {{ story.by }}</p>
      <p>{{ millisToDay(story.time) }}</p>
    </div>
    <div class="wrap__top__comment">
      <h2>Comments :</h2>
    </div>
    <div v-for="comment in comments" :key="comment.id">
      <div class="comment__wrap">
        <div class="comment__block">
          <p class="comment__text">{{ comment.text }}</p>
          <div class="bottom__comment">
            <div class="comment__author">{{ comment.by }}</div>
            <div class="comment__date">{{ millisToDay(comment.time) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "Detail",

  data() {
    return {
      story: {},
      comments: [],
      load: false,
    };
  },

  methods: {
    getDetailNews() {
      this.load = true;
      axios
        .get(
          "https://hacker-news.firebaseio.com/v0/item/" +
            this.$route.params.id +
            ".json"
        )
        .then((res) => {
          this.story = res.data;
          console.log(this.story);
          this.story.comments = [];
          this.load = false;
          this.story.kids.forEach((id) => {
            this.load = true;
            axios
              .get("https://hacker-news.firebaseio.com/v0/item/" + id + ".json")
              .then((res) => {
                // console.log(res.data);
                this.comments.push(res.data);
                this.load = false;
              })
              .catch((err) => {
                console.log(err);
              });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    millisToDay() {
      return moment().format("MM-DD-YYYY");
    },
  },

  created() {
    this.getDetailNews();
    this.millisToDay();
  },
};
</script>

<style>
.comment__wrap {
  margin-bottom: 1.25rem;
  min-height: 5.3125rem;
}

.comment__block {
  padding: 1rem;
  background-color: dodgerblue;
  color: white;
  display: grid;
  margin: 0 auto;
  max-width: 1200px;
  vertical-align: top;
  border-radius: 0.1875rem;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
}

.comment__block textarea {
  width: 100%;
  resize: none;
}

.comment__text {
  margin-bottom: 1.25rem;
}

.bottom__comment {
  color: white;
  font-size: 0.875rem;
}

.comment__date {
  float: left;
}

.wrap__top {
  text-align: center;
  color: black;
}

.wrap__top__comment {
  color: black;
}

@media (min-width: 768px) {
  .comment__wrap {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (min-width: 992px) {
  .comment__wrap {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>

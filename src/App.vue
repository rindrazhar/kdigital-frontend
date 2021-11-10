<template>
  <div id="app">
    <div class="container">
      <div id="nav">
        <router-link class="wrap__text" to="/"
          ><h1>Top Stories</h1></router-link
        >
      </div>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
body {
  background-color: #f0f2fa;
  font-family: "PT Sans", "Helvetica Neue", "Helvetica", "Roboto", "Arial",
    sans-serif;
  color: #555f77;
  -webkit-font-smoothing: antialiased;
}

.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}

@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}

@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}

#nav h1 {
  /* text-align: center; */
  color: black;
}

#nav .wrap__text {
  text-decoration: none;
}
</style>

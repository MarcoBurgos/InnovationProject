<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Movies List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(movie, index) in movies"
          :key="index"
          @click="setActiveMovie(movie, index)"
        >
          {{ movie.title }}
        </li>
      </ul>


    </div>
    <div class="col-md-6">
      <div v-if="currentMovie">
        <h4>Movies</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentMovie.title }}
        </div>
        <div>
          <label><strong>Genre:</strong></label> {{ currentMovie.genre }}
        </div>
        <div>
          <label><strong>Year:</strong></label> {{ currentMovie.year }}
        </div>

        <a class="badge badge-warning"
          :href="'/movies/' + currentMovie.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Movie...</p>
      </div>
    </div>
  </div>
</template>

<script>
import MovieDataService from "../services/MovieDataService";

export default {
  name: "movies-list",
  data() {
    return {
      movies: [],
      currentMovie: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveMovies() {
      MovieDataService.getAll()
        .then(response => {
          this.movies = response.data.results;
          console.log(this.movies)
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveMovies();
      this.currentMovies = null;
      this.currentIndex = -1;
    },

    setActiveMovie(movie, index) {
      this.currentMovie = movie;
      this.currentIndex = index;
    },

  },
  mounted() {
    this.retrieveMovies();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>

<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="tutorial.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="genre">Genre</label>
        <input
          class="form-control"
          id="genre"
          required
          v-model="movies.genre"
          name="genre"
        />
      </div>

      <button @click="saveMovie" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newMovie">Add</button>
    </div>
  </div>
</template>

<script>
import MovieDataService from "../services/MovieDataService";

export default {
  name: "add-movie",
  data() {
    return {
      movie: {
        id: null,
        title: "",
        genre: "",
        year: false
      },
      submitted: false
    };
  },
  methods: {
    saveMovie() {
      var data = {
        title: this.movie.title,
        genre: this.movie.genre
      };

      MovieDataService.create(data)
        .then(response => {
          this.movie.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

    newMovie() {
      this.submitted = false;
      this.tutorial = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>

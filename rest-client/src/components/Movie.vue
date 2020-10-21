<template>
  <div v-if="currentMovie" class="edit-form">
    <h4>Movie</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentMovie.title"
        />
      </div>
      <div class="form-group">
        <label for="genre">Genre</label>
        <input type="text" class="form-control" id="genre"
          v-model="currentMovie.genre"
        />
      </div>

      <div class="form-group">
        <label><strong>Year:</strong></label>
        {{ currentMovie.year }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentMovie.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteMovie"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateMovie"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Movie...</p>
  </div>
</template>

<script>
import MovieDataService from "../services/MovieDataService";

export default {
  name: "movie",
  data() {
    return {
      currentMovie: null,
      message: ''
    };
  },
  methods: {
    getMovie(id) {
      MovieDataService.get(id)
        .then(response => {
          this.currentMovie = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(year) {
      var data = {
        id: this.currentMovie.id,
        title: this.currentMovie.title,
        description: this.currentTutorial.genre,
        year: year
      };

      MovieDataService.update(this.currentMovie.id, data)
        .then(response => {
          this.currentMovie.year = year;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateMovie() {
      MovieDataService.update(this.currentMovie.id, this.currentMovie)
        .then(response => {
          console.log(response.data);
          this.message = 'The movie was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteMovie() {
      MovieDataService.delete(this.currentMovie.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "movies" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getMovie(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>

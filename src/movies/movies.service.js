const knex = require("../db/connection");

//this list is updated so that it checks that is_showing is either true or false and then either returns movies or looks in movies_theaters for the movies with the is_showing is true.
function list(is_showing) {
  if (is_showing === "true") {
    return knex("movies")
      .whereIn(
        "movie_id",
        knex("movies_theaters")
          .select("movie_id")
          .where("is_showing", true)
      );
  } else {
    return knex("movies");
  }
}

//a read function that uses the movieId given to look for the specific movie.
function read(movieId) {
  return knex("movies")
    .select("*")
    .where({ movie_id: movieId })
    .first();
}

//joins theaters and movies_theaters for a movie_id that matches the one in movies_theaters and returns all.

function getMovieTheaters(movieId) {
  return knex("theaters")
    .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
    .where({ "movies_theaters.movie_id": movieId })
    .select("*");
}


// joins reviews and critics and selects all data from reviews where reviews movie_id matches the given movie_id
function getMovieReviews(movieId) {
  return knex("reviews")
    .join("critics", "reviews.critic_id", "critics.critic_id")
    .select("reviews.*")
    .where({ "reviews.movie_id": movieId });

  }

//searches for the critic table that matches the criticId
function getCritic(criticId) {
  return knex("critics")
    .select("*")
    .where({ critic_id: criticId });
}

module.exports = {
  list,
  read,
  getMovieTheaters,
  getCritic,
  getMovieReviews,
};
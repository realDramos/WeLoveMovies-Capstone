const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

//using the reduceProperties function to create the correct output.
const movies = reduceProperties("theater_id",{
  movie_id: ["movies",null, "movie_id"],
  title: ["movies",null, "title"],
  runtime_in_minutes:["movies", null, "runtime_in_minutes"],
  rating:["movies",null,"rating"],
  description:["movies",null,"description"],
  image_url:["movies",null,"image_url"],
  m_created_at:["movies",null,"created_at"],
  m_updated_at:["movies",null,"updated_at"],
  is_showing:["movies",null,"is_showing"],
  mt_theater_id:["movies",null,"theater_id"],
})


// getting to theaters,movies_theaters, movies to get all the data using 2 joins
function list(){
  return knex("theaters as t")
  .join("movies_theaters as mt","mt.theater_id", "t.theater_id")
  .join("movies as m", "m.movie_id", "mt.movie_id")
  .select(
    "t.*",
    "m.*",
    "mt.*",
    )
  .then(theaters => movies(theaters))
}

module.exports = {
  list,
}
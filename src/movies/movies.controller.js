const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//get the is_showing query and calls list from service file with is_showing.
async function list(req, res) {
  const { is_showing } = req.query;
  const data = await service.list(is_showing);
  res.json({ data });
}

//middleware to check if the movieId exists in the data.
async function ifMovieExists(req, res, next) {
  const { movieId } = req.params;
  const foundMovie = await service.read(movieId);
  
  if (foundMovie) {
    res.locals.foundMovie = foundMovie;
    return next();
  } else {
    return res.status(404).json({ error: "Movie not found" });
  }
}

//get movieId and then calls the read in service and returns if it exists.
async function read(req, res) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);

  if (movie) {
    return res.json({ data: movie });
  }
}

//gets the movieId and calls getMovieTheaters and returns.
async function getMovieTheaters(req, res, next) {
  const { movieId } = req.params;
  const theaters = await service.getMovieTheaters(Number(movieId));
  res.json({ data: theaters });
}

//get movieId calls getMovieReviews from service file and creates an array. then the critic data using the function getCritic is mapped into the allReviews array.
async function getMovieReviews(req, res, next) {
  const { movieId } = req.params;
  const reviews = await service.getMovieReviews(movieId);
  const allReviews = [];

  await Promise.all(
    reviews.map(async (review) => {
      const critic = await service.getCritic(review.critic_id);
      review.critic = critic[0];
      allReviews.push(review);
    })
  );

  res.status(200).json({ data: allReviews });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [ifMovieExists, asyncErrorBoundary(read)],
  getMovieTheaters: [ifMovieExists, asyncErrorBoundary(getMovieTheaters)],
  getMovieReviews: [ifMovieExists, asyncErrorBoundary(getMovieReviews)],
};
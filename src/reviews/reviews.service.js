const knex = require("../db/connection");

//looks for a review table where the id matches the updatedReview.
function update(updatedReview) {
  return knex("reviews")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then((data) => data[0]);
}

//looks for the review matching the reviewId given.
function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

//looks for the critics that is matching the criticId being looked for.
function getCritic(criticId) {
  return knex("critics").select("*").where({ critic_id: criticId }).first();
}

//the delete function that uses the reviewId
function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
  update,
  read,
  getCritic,
  delete: destroy,
};
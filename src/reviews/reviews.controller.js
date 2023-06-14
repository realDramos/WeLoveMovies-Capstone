const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//middleware to check if the given reviewId matches the data.
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const foundReview = await service.read(Number(reviewId));
  if (foundReview) {
    res.locals.review = foundReview;
    return next();
  } else {
    return res.status(404).json({ error: "Review cannot be found" });
  }
}

//gets the body data given from user and then calls update, read, and getCritic to update the specified review
async function update(req, res, next) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
  };
  await service.update(updatedReview);
  const updatedRev = await service.read(updatedReview.review_id);
  updatedRev.critic = await service.getCritic(updatedReview.critic_id);
  res.json({ data: updatedRev });
}
//uses the reviewId then calls the service file to delete.
async function destroy(req, res, next) {
  const { reviewId } = req.params;
  await service.delete(Number(reviewId));
  res.sendStatus(204);
}

module.exports = {
  update: [reviewExists, asyncErrorBoundary(update)],
  delete: [reviewExists, asyncErrorBoundary(destroy)],
};
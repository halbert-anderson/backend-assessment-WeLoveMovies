const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const hasRequiredProperties =  hasProperties(
"review_id",
"content",
"score",
"critic_id",
"movie_id",);


function hasData(req, res, next) {

   if (req.body) {

      return next()

   }

  next({status: 400, message: "body must have data property"})

}

const VALID_PROPERTIES = [
"review_id",
"content",
"score",
"critic_id",
"movie_id",
];


function hasOnlyValidProperties(req, res, next) {
 
    const { data = {} } = req.body;

    const invalidFields = Object.keys(data)
                              .filter((field) => !VALID_PROPERTIES.includes(field));

    if (invalidFields.length) {

        return next({

           status: 400,

           message: `Invalid field(s): ${invalidFields.join(", ")}`,

        });

    };

    next();

}
  

async function reviewExists(req, res, next) {

    const review = await reviewsService.read(req.params.reviewId);
    
      if (review) {
   
          res.locals.review = review;

          return next();

      }

    next({ status: 404, message: `Review cannot be found.` });

}


async function read(req, res) {

    const { review } = res.locals;

    // add a nested critic object to the review thats being read
    const data = await reviewsService.getReviewWithCritic(review.review_id);
 
    res.json({ data });

}


async function update(req, res, next) {
 
    const updatedReview = { ...res.locals.review, ...req.body.data, review_id: res.locals.review.review_id, };    
 
    const updatedMovieReview = await reviewsService.update(updatedReview);
    
    // include a nested critic object in the updated movie review
    const data = await reviewsService.getReviewWithCritic(res.locals.review.review_id); 
   
    res.json({ data });

}
  

async function list(req, res, next) {

      const { movieId } = req.params;

      // if movieId is present only get a list of reviews for that movie 
      // else get a list of reviews for all movies.
      const listOfReviews = movieId ? await reviewsService.reviewsForAMovie(movieId) : await reviewsService.list();
   
      // include a nested critic object in each movie review in the list of reviews
      const listOfReviewsWithCritics = await Promise.all(listOfReviews.map(review => reviewsService.getReviewWithCritic(review.review_id)));
      
      res.json({ data: listOfReviewsWithCritics });
    
}


async function destroy(req, res) {

    const { review } = res.locals;

    await reviewsService.delete(review.review_id);

    res.sendStatus(204);

}


module.exports = {

    update: [
        hasData,
        asyncErrorBoundary(reviewExists),
        hasOnlyValidProperties, 
        hasRequiredProperties,
        asyncErrorBoundary(update),],

    delete: [asyncErrorBoundary(reviewExists),
             asyncErrorBoundary(destroy),], 

    read: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(read),],

    list: asyncErrorBoundary(list),

}
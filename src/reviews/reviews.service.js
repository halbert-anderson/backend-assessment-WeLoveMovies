const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({

    //  critic_id: "critic.critic_id",
      preferred_name: "critic.preferred_name",
      surname: "critic.surname",
      organization_name: "critic.organization_name",
    //  created_at: "critic.created_at",
    //  updated_at: "critic.updated_at",

});

// returns all reviews for a given movie
function reviewsForAMovie(movie_Id) {

    return knex("movies as m")
           .join("reviews as r","m.movie_id","r.movie_id")
           .select("r.*")
           .where({ "r.movie_id": movie_Id })
           //.first()
        
}


function getReviewWithCritic(reviewId) {

    return knex("reviews as r")
           .join("critics as c", "c.critic_id", "r.critic_id")
           .select("r.*","c.*")
           .where({ "r.review_id": reviewId })
           .first()
           .then(addCritic);

  }

// async function getReviewWithCritic(reviewId) {
//   const result = await knex("reviews as r")
//         .join("critics as c", "r.critic_id", "c.critic_id")
//         .select("*")
//         .where({ review_id: reviewId })
//         .first();
//   const updatedReview = addCritic(result);
//   return updatedReview;
// }

function update(updatedReview) {

    return knex("reviews")
           .select("*")
           .where({ "review_id": updatedReview.review_id })
           .update(updatedReview, "*")      
           .then((updatedRecords) => updatedRecords[0])
    
}          

function read(reviewId) {
    
    return knex("reviews as r")
           .select("r.*")
           .where({ review_id: reviewId })
           .first()
     
}

function list() {

    return knex("reviews")
           .select("*");

}

function destroy(review_id) {

    return knex("reviews")
           .where({ review_id })
           .del();

}

module.exports = {

      getReviewWithCritic,
      reviewsForAMovie,
      list,
      read,
      update,
      delete: destroy,

  };
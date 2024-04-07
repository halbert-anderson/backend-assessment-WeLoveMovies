const knex = require("../db/connection");

function read(movieId) { 

    return knex("movies")
           .select("*")
           .where({ "movie_id": movieId })
           .first();
           
}

function is_showing() {

    return knex("movies as m")
         .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
         .select("m.*")
         .distinct()
         .where({ "mt.is_showing": true }); 

}

function list() {   

    return knex("movies")
           .select("*");

}

module.exports = {
    read,
    list, 
    is_showing,
};
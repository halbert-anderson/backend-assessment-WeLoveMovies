const knex = require("../db/connection");


function read(movieTheaterId) {
    
    return knex("movies_theaters")
           .select("*")
           .where({ movieTheater_id: movieTheaterId })
           .first();

}


function list() {

    return knex("movies_theaters")
         .select("*");

}



module.exports = { 
         read,
         list, 
};
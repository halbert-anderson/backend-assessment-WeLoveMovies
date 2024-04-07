const moviesTheatersService = require("./movies-theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");



async function movieTheaterExists(req, res, next) {

    const movie_theater = await  moivesTheatersService.read(req.params.movieTheaterId);
    
    if(movie_theater) {

       res.locals.movie_theater = movie_theater;

       return next();

    }

    next({ status: 404, message: `Movie_theater cannot be found.` });

}


function read(req, res) {

    const { movie_theater: data } = res.locals;

    res.json({ data });

}


async function list(req, res, next) {

    const { movieId } = req.params;

    const movies_theaters = await moviesTheatersService.list();

    res.json({ data: movies_theaters.filter(movieId ? movie_theater => movie_theater.movie_id == movieId : () => true) });

}




module.exports = {
    
    read: [asyncErrorBoundary(movieTheaterExists), read],
    
    list: asyncErrorBoundary(list),

  };


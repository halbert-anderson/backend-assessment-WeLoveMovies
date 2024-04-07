const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function theaterExists(req, res, next) {

   const { theaterId } = req.params;

   const theater = await theatersService.read(theaterId);

   if(theater) {

       res.locals.theater = theater;

       return next();

    }

    next({ status: 404, message: `Theater cannot be found.` });

}


function read(req, res) {

    const { theater: data } = res.locals;

    res.json({ data });

}


async function list(req, res, next) {

    const { movieId } = req.params;

    const theaters = movieId ? await theatersService.theatersShowingTheMovie(movieId): await theatersService.list();

    res.json({ data: theaters });

}

module.exports = {
    
    read: [asyncErrorBoundary(theaterExists), read,],

    list: asyncErrorBoundary(list),

  };


 

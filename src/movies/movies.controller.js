const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function movieExists(req, res, next) {

    const movie = await  moviesService.read(req.params.movieId);
  
    if(movie){

       res.locals.movie = movie;

       return next();
    
    };

    next({ status: 404, message: `Movie cannot be found.` });

}


function read(req, res) {

    const { movie: data } = res.locals;
  
    res.json({ data });

}


async function list(req, res, next) {

   const is_showing = req.query.is_showing;
   
  //if a query string with 'is_showing = true' is present then only list movies with is_showing parmeter
  //else list all movies
   const data = is_showing ? await moviesService.is_showing() : await moviesService.list() ;

   res.json({ data });

}



module.exports = {

    read: [asyncErrorBoundary(movieExists), read],
    list:  asyncErrorBoundary(list),

};
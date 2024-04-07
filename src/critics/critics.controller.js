const criticsService = require("./critics.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function criticExists(req, res, next) {

    const { criticId } = req.params;

    const critic = await criticsService.read(criticId);

    if(critic){

        res.locals.critic = critic
        
        next();
    
    }

    next({ status: 404, message: `Critic cannot be found`});    

}


function read(req, res) {

    res.json({ data: res.locals.critic });
     
}


async function list(){

   const data = await criticsService.list();
   
   res.json({ data });  

}



module.exports = {

    read: [asyncErrorBoundary(criticExists), read],
    
    list: asyncErrorBoundary(list),

}
function hasProperties(...properties) {
  
  return function (req, res, next) {
    
    const { data = {} } = req.body;

    try {

      let propertiesToCheck;
      const { reviewId } = req.params;

      // If updating a review only check the properties that are changing,
      // else, if creating a review, checkt that all properties are present. 
       
      if(reviewId){
       
          propertiesToCheck = Object.keys(data)
         .filter((field) => properties.includes(field));      
           
      }
      else{

         propertiesToCheck = properties;

      };
                
         propertiesToCheck.forEach((property) => {
      
              if (!data[property]) {

                 const error = new Error(`A '${property}' property is required.`);
                
                 error.status = 400;
                
                 throw error;

              }

          });

          next();

    } 

    catch (error) {

          next(error);

    };

  };

}

module.exports = hasProperties;
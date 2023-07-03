const {HttpError} = require('../helpers');

const validateBody = schema =>{
  
    const func = (req, res, next)=>{
      if(Object.keys(req.body).length===0){
        throw HttpError(400, 'Missing fields')
      }
        const {error} = schema.validate(req.body);
  
        if(error){
          const field = (error.details[0].path[0]);
          next (HttpError(400, `Missing required ${field} field or incorrect subscription`))
        }
        next()
    }
    return func;
}

module.exports = validateBody;
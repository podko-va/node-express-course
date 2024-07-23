const {CustomAPIErrors} = require('../errors/customErrors')

const errorHandler = (err,req,res,next) =>{
    if (err instanceof CustomAPIErrors) {
        return res.status(err.statusCode).json({msg: err.message})    
    }
    return res.status(500).json({ msg: 'Something went wrong, try again later.'})
}

module.exports = errorHandler
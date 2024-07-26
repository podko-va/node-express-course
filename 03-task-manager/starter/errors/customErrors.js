class CustomAPIErrors extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
    }
}

const createCustomError = (msg,statusCode) =>{
    return new CustomAPIErrors(msg,statusCode)
}

module.exports = {createCustomError, CustomAPIErrors}
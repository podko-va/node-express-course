const CustomAPIError = require('./custom-error')
const UnauthenticatedError = require('./authenticated')
const BadRequest = require('./bad-request')

module.exports = {
    CustomAPIError,
    UnauthenticatedError,
    BadRequest
}
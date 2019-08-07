const { Response } = require('./helpers')

class HomeError extends Response {
    constructor(data='', status=500) {
        super(status, data)
    }
}

class BadRequestError extends HomeError {
    constructor(data) {
        super(data, 400)
    }
}

class NotFoundError extends HomeError {
    constructor(data) {
        super(data, 404)
    }
}

module.exports = {
    BadRequestError,
    NotFoundError,
}

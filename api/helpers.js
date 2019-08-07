function wrapAsync(fn) {
    return function(req, res, next) {
        // Make sure to `.catch()` any errors and pass them along to the `next()`
        // middleware in the chain, in this case the error handler.
        fn(req, res, next).catch(next);
    };
}

class Response {
    constructor(status, data) {
        this.status = status
        this.data = data
    }

    toJson(url) {
        return {
            url,
            data: this.data,
        }
    }
}

module.exports = {
    Response,
    wrapAsync,
}

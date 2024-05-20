function errorMiddleware() {
    const logError = function (err, req, res, next) {
        console.error(process.env.NODE_ENV === 'development' ? err.stack : err);
        next(err);
    }

    return {
        logError
    }
}

module.exports = errorMiddleware;
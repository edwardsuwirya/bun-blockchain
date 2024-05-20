const AppResponse = require("../../../models/appResponse.model.js");
// Factory Function
function errorController() {
    const errorHandler = function (err, req, res, next) {
        console.log("Middleware Error Handling");
        const errMsg = err.message || res.responseStatuses.GENERAL_ERROR.message;
        const serverErrorResp = new AppResponse(res.responseStatuses.GENERAL_ERROR.code, "FAILED", errMsg);
        res.statusCode = 500;
        res.json(serverErrorResp);
    }

    return {
        errorHandler
    }
}

module.exports = errorController;
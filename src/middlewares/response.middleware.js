const responseStatus = require("../utils/responseStatus.helper.js");
const AppResponse = require("../models/appResponse.model.js");

function responseMiddleware() {
    const responseHelper = function (req, res, next) {
        res.responseStatuses = responseStatus;

        res.success = function (data, responseCode) {
            res.statusCode = 200;
            let successResp;
            if (responseCode.code) {
                successResp = new AppResponse(responseCode.code, "SUCCESS", responseCode.message, data);
            } else {
                successResp = new AppResponse(responseStatus.SUCCESS.code, "SUCCESS", responseCode)
            }

            res.json(successResp);
        };
        res.badRequest = function (data, responseCode) {
            res.statusCode = 400;
            const badRequestResp = new AppResponse(responseCode.code, "FAILED", responseCode.message, data);
            res.json(badRequestResp);
        }
        res.notFound = function (responseCode) {
            res.statusCode = 404;
            const notFoundResp = new AppResponse(responseCode.code, "FAILED", responseCode.message);
            res.json(notFoundResp);
        }
        next();
    }

    return {
        responseHelper
    }
}

module.exports = responseMiddleware;
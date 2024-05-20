const express = require('express');
const consensusRouter = express.Router();

function consensusRoutes(controller) {
    consensusRouter.get("/", controller.consensus);
    return consensusRouter;
}

module.exports = consensusRoutes;
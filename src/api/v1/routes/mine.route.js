const express = require('express');
const miningRouter = express.Router();

function mineRoutes(controller) {
    miningRouter.get("/", controller.mine);
    return miningRouter;
}

module.exports = mineRoutes;
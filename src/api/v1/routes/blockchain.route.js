const express = require('express');
const blockchainRouter = express.Router();

function blockchainRoutes(controller) {
    blockchainRouter.get("/", controller.blockchain);
    blockchainRouter.post("/receive-new-block", controller.receiveNewBlock);
    blockchainRouter.get("/block/:blockHash", controller.getBlockByHash)
    return blockchainRouter;
}

module.exports = blockchainRoutes;
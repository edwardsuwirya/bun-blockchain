const express = require('express');
const transactionRouter = express.Router();

function transactionRoutes(controller) {
    transactionRouter.post("/", controller.pendingTransaction);
    transactionRouter.post("/broadcast", controller.broadcastTransaction);
    transactionRouter.get("/:transactionId", controller.getTransactionById)
    return transactionRouter;
}

module.exports = transactionRoutes;
const express = require("express");
const router = express.Router();

const transactionController = require("./controllers/transaction.controller.js");
const transactionRoute = require("./routes/transaction.route.js");
const nodeRegistrationController = require("./controllers/nodeRegistration.controller.js");
const nodeRegistrationRoute = require("./routes/nodeRegistration.route.js");
const blockchainController = require("./controllers/blockchain.controller.js");
const blockchainRoute = require("./routes/blockchain.route.js");
const mineController = require("./controllers/mine.controller.js");
const mineRoute = require("./routes/mine.route.js");
const consensusController = require("./controllers/consensus.controller.js");
const consensusRoute = require("./routes/consensus.route.js");

function routerV1(bitcoin, api, nodeAddress) {
    const trxController = transactionController(bitcoin, api);
    const trxRoute = transactionRoute(trxController);
    const registrationController = nodeRegistrationController(bitcoin, api);
    const registrationRoute = nodeRegistrationRoute(registrationController);
    const bcController = blockchainController(bitcoin);
    const bcRoute = blockchainRoute(bcController);
    const miningController = mineController(bitcoin, nodeAddress, api);
    const miningRoute = mineRoute(miningController);
    const csController = consensusController(bitcoin, api);
    const csRoute = consensusRoute(csController);
    router.use('/transaction', trxRoute);
    router.use('/registration', registrationRoute);
    router.use('/blockchain', bcRoute);
    router.use('/mine', miningRoute);
    router.use('/consensus', csRoute);
    return router;
}


module.exports = routerV1;
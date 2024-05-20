const express = require('express');
const registrationRouter = express.Router();

function registrationRoutes(controller) {
    registrationRouter.post("/node", controller.nodeRegistration);
    registrationRouter.post("/broadcast", controller.broadcastRegistration);
    registrationRouter.post("/bulk", controller.bulkRegistration);
    return registrationRouter;
}

module.exports = registrationRoutes;
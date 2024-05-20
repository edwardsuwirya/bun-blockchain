const express = require('express');
const app = express();
const port = Bun.argv[2];

const bodyParser = require('body-parser');
const Blockhain = require('./blockchain');
const errorMiddleware = require("./middlewares/error.middleware");
const responseMiddleware = require("./middlewares/response.middleware");
const errorController = require("./api/v1/controllers/error.controller");
const apiHelper = require("./utils/api.helper");
const uuidHelper = require("./utils/uuid.helper");
const apiV1 = require("./api/v1/api.js");

const nodeAddress = uuidHelper().generateUuid();
const bitcoin = new Blockhain();
const api = apiHelper();
const errController = errorController();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(responseMiddleware().responseHelper);
app.use('/api/v1', apiV1(bitcoin, api, nodeAddress));
app.use(errorMiddleware().logError);
app.use(errController.errorHandler);

app.listen(port, function () {
    console.log(`listening on port ${port}...`);
});
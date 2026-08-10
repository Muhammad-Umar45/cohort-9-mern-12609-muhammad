const express = require("express");
const pinoHttp = require("pino-http");
const logger = require("./config/logger");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(pinoHttp({ logger }));
app.use("/api/v1", routes);


app.use(errorHandler);
module.exports = app;
"use strict";

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet").default;
const morgan = require("morgan");
const dotenv = require("dotenv");

const ErrorUtils = require("./utils/errorUtils");

const app = express();
dotenv.config();

app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan(process.env.NODE_ENV));
app.use(
  express.urlencoded({
    extended: true,
  })
);

//* ROUTES
app.use("/api", require("./app/routes"));

// Use the notFoundServer for 404 errors
app.use(ErrorUtils.notFoundHandler);

// Use the errorHandler for all other errors
app.use(ErrorUtils.errorHandler);

module.exports = app;

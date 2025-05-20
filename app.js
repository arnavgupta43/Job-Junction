require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDb = require("./db/connect");
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const authUSer = require("./middleware/authentication");
const cors = require("cors");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");
app.use(express.json());
// /routes

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(helmet());
app.use(cors());
app.use(express.static("./public"));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authUSer, jobsRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    console.log("DataBase Connected");
    app.listen(port, console.log(`Server listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();

require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDb = require("./db/connect");
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const authUSer = require("./middleware/authentication");
app.use(express.json());
// /routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authUSer, jobsRouter);

// error handler
const notFoundMiddleware = require("./middleware/error-handler");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.get("/", (req, res) => {
  res.send("Jobs Api");
});

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

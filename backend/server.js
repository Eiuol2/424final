let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
let dbConfig = require("./database/db");
const dotenv = require("dotenv");
const createError = require("http-errors");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config();

// Express Route
const postRoute = require("../backend/routes/post.route");

const resumeRoute = require("../backend/routes/resume.route");

const userRoute = require("../backend/routes/user.route");

const profileRoute = require("../backend/routes/profile.route");

// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("Database sucessfully connected!");
    },
    (error) => {
      console.log("Could not connect to database : " + error);
    }
  );
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/posts", postRoute);
app.use("/resume", resumeRoute);
app.use("/users", userRoute);
app.use("/profile", profileRoute);

//---------------------------------------------JWT RELATED---------------------------------------------------------------

//Generating tokens

//---------------------------------------------JWT RELATED---------------------------------------------------------------

// PORT
const port = 5016;

app.listen(process.env.PORT || port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error("This isn't it: " + err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

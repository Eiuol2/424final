const asyncify = require("express-asyncify");
const jwt = require("jsonwebtoken");

let mongoose = require("mongoose"),
  express = require("express"),
  router = asyncify(express.Router());

let postSchema = require("../Models/Post");

function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  //Getting the 2nd part of the auth hearder (the token)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    // console.log(req);
    console.log("No token received");
    return res.status(401).end();
  } else {
    // If a callback is supplied, verify() runs async
    // If a callback isn't supplied, verify() runs synchronously
    // verify() throws an error if the token is invalid
    try {
      // verify() returns the decoded obj which includes whatever objs
      // we use to code/sign the token
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.userid = decoded;
      // in our case, we used the username to sign the token
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).end();
    }
  }
}

//authenticate block
router.use("/create-post", (req, res, next) => {
  authenticateUser(req, res, next);
});

// create post
router.route("/create-post").post((req, res, next) => {
  const object = req.body;
  object.userid = req.userid;
  postSchema.create(object, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//authenticate block
router.use("/", (req, res, next) => {
  authenticateUser(req, res, next);
});

//read posts
router.route("/").get(async (req, res) => {
  const object = req.body;
  object.userid = req.userid._id;
  postSchema.find({ userid: object.userid }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});


router.use("/edit-post/:id", (req, res, next) => {
  authenticateUser(req, res, next);
});

// get single post
router.route("/edit-post/:id").get((req, res) => {
  console.log("ROUTING PROPERLY");
  console.log(req.params.id);
  postSchema.findById( req.params.id , (error, data) => {
    if (error) {
      console.log("ERROR NOT FOIMD");
      return next(error);
    } else {
      res.json(data);
      console.log("This is data: " + data);
      console.log("retrieved!");
    }
  });
});

// update post
router.route("/update-post/:id").put((req, res, next) => {
  postSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Post updated successfully!");
      }
    }
  );
});

//authenticate delete
router.use("/delete-post/:id", (req, res, next) => {
  console.log("insilde autheticaTE");
  authenticateUser(req, res, next);
});

//delete post
router.route("/delete-post/:id").delete((req, res, next) => {
  console.log("inside delete-post");
  postSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(204).json({
        msg: data, // ???
      });
    }
  });
});

module.exports = router;

const asyncify = require("express-asyncify");
const jwt = require("jsonwebtoken");

let mongoose = require("mongoose"),
  express = require("express"),
  router = asyncify(express.Router());

let profileSchema = require("../Models/Profile");

router.route("/createprofile").post(async (req, res) => {
  const dummy = {
    name: "",
    year: "",
    major: "",
    desiredRole: "",
    bio: "",
    username: "",
  };
  dummy.name = req.body.name;
  dummy.year = req.body.year;
  dummy.major = req.body.major;
  dummy.desiredRole = req.body.desiredRole;
  dummy.bio = req.body.bio;
  dummy.username = req.body.username;
  profileSchema.create(dummy, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.status(201).send(data); //what to send?
    }
  });
});

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
      req.username = decoded._id;
      console.log("This is decoded: " + JSON.stringify(decoded));
      // in our case, we used the username to sign the token
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).end();
    }
  }
}

router.use("/update-profile", (req, res, next) => {
  authenticateUser(req, res, next);
});

// create post
router.route("/update-profile").post((req, res, next) => {
  const object = req.body;
   
console.log("THIS IS THE OBJECT: " + JSON.stringify(object));

  const TempId = object._id;
  delete object._id;

  profileSchema.replaceOne({ _id: TempId}, object, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});



router.use("/edit-profile", (req, res, next) => {
  authenticateUser(req, res, next);
});

// get single post
router.route("/edit-profile").get((req, res) => {
  console.log("ROUTING PROPERLY");
  console.log(req.params.id);
  postSchema.findById( req.params.id , (error, data) => {
    if (error) {
      console.log("ERROR NOT FOIMD");
      return next(error);
    } else {
      res.json(data);
      console.log(data);
      console.log("retrieved!");
    }
  });
});





router.use("/getprofile", (req, res, next) => {
  authenticateUser(req, res, next);
});

router.route("/getprofile").get(async (req, res) => {
  const object = req.body;
  object.username = req.username;
  console.log("This is req username: " + object.username);
  profileSchema.find({ username: object.username }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log("This is what we got for profile fetching: " + data); //wrong
      res.json(data);
    }
  });
});

module.exports = router;

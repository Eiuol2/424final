const asyncify = require("express-asyncify")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

let mongoose = require("mongoose"),
  express = require("express"),
  router = asyncify(express.Router())

let userSchema = require("../Models/User")
const { restart } = require("nodemon")

function generateAccessToken(id) {
  return jwt.sign({ _id: id }, process.env.TOKEN_SECRET, {
    expiresIn: "800s",
  })
}

//Signup

router.route("/signup").post(async (req, res, next) => {
  const placeholderUser = { username: "", pwd: "" }
  const username = req.body.username
  const userPwd = req.body.pwd.toString()
  const userExist = await userSchema.find({ username: username })
  if (!username && !pwd) {
    res.status(400).send("Bad request: Invalid input data.")
  } else {
    if (userExist.length > 0) {
      //Conflicting usernames. Assuming it's not allowed, then:
      res.status(409).send("Username already taken")
    } else {
      // generate salt to hash password
      /* Made up of random bits added to each password instance before its hashing. 
        Salts create unique passwords even in the instance of two users choosing the 
        same passwords. Salts help us mitigate hash table attacks by forcing attackers 
        to re-compute them using the salts for each user.
        More info: https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/
        */
      // Also, you can pull this salt from an env variable

      const salt = await bcrypt.genSalt(10)

      // On the database you never store the user input pwd.
      // So, let's hash it:
      const hashedPWd = await bcrypt.hash(userPwd, salt)
      // Now, call a model function to store the username and hashedPwd (a new user)
      // For demo purposes, I'm skipping the model piece, and assigning the new user to this fake obj
      placeholderUser.username = username
      placeholderUser.pwd = hashedPWd
      userSchema.create(placeholderUser, (error, data) => {
        if (error) {
          return next(error)
        } else {
          console.log("This is before token: " + data)
          const token = generateAccessToken(data.username)
          res.status(201).send(token)
        }
      })
    }
  }
})

router.route("/login").post(async (req, res) => {
  const username = req.body.username
  const pwd = req.body.pwd
  console.log("username from req: " + username)
  // Call a model function to retrieve an existing user based on username
  //  (or any other unique identifier such as email if that applies to your app)
  // Using our fake user for demo purposes
  const retrievedUser = await userSchema.find({ username: username })
  console.log("retrievedUser=" + retrievedUser[0])
  if (retrievedUser[0].username && retrievedUser[0].pwd) {
    const isValid = await bcrypt.compare(
      pwd.toString(),
      retrievedUser[0].pwd.toString()
    )

    if (isValid) {
      // Generate token and respond
      const token = generateAccessToken(username)
      res.status(200).send(token)
    } else {
      //Unauthorized due to invalid password
      // the status code would be 401 which means unauthorized
      res.status(401).send("Unauthorized")
    }
  } else {
    //Unauthorized due to invalid username
    res.status(401).send("Unauthorized")
  }
})

module.exports = router

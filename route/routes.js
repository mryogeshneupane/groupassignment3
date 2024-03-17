require("dotenv").config();
require("../db").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/authentication");
const controller = require("../controller/controller");
const User = require("../model/users");
const app = express();

app.use(express.json());

//registering user
app.post("/register", async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      //validating user inputs
      if (!(email && password && firstName && lastName)) {
        res.status(400).send("Please fill all fields!");
      }
      // check if user already exist
      const CheckUser = await User.findOne({ email });
      if (CheckUser) {
        return res.status(409).send("User is already registered!");
      }
  
      //encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      //creating new user
      const user = await User.create({
        firstName,
        lastName,
        email: email.toLowerCase(), 
        password: encryptedPassword,
      });
  
      //creating new token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "30m",
        }
      );
      user.token = token;
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
    
  });

//Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("Please fill all fields!");
    }
    //checking if user exist in our database
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "30m",
        }
      );
      user.token = token;
      res.status(200).json(user);
    }
   
  } catch (err) {
    console.log(err);
  }
  
});

app.get("/welcome", auth, (req, res) => {
  res.status(200).send("You are successfully logged in. Welcome to Group Assignment 3");
});

app.get("/allbooks", controller.getBooks);

module.exports = app;
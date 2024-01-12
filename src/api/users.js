const express = require('express');
const app = express();
const router = express.Router();

const bcrypt = require('bcrypt');

const User = require("../models/User");

router.get('/test', (req, res) => {
  res.json({test: "users working..."});
});

router.get('/getAll', (req, res) => {
  User.find()
    .then(user => res.json(user));
})

//Sign Up

router.get('/signup/test', (req, res) => {
  res.json({signinTest: "signup working..."});
});

// Sign-up endpoint
router.post('/signup', (req, res) => {
  // console.log(req.body)
  User.findOne({email: req.body.email})
    .then(user => {
      if(user) {
        res.json({ error: "email already exists" });
      } else {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(req.body.password, salt, function(err, hash) {
              // Store hash in your password DB.
              const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                admin: req.body.email === "santaclous112@gmail.com" ? "admin" : "client"
              })
              newUser
                .save()
                .then(res.json({ message: 'Sign-up successful' }))
                .catch(err => res.json({message: "failed"}))
          });
      });
      }
    })
});

//Sign in

router.get('/signin/test', (req, res) => {
  res.json({signinTest: "signin working..."});
});

router.post('/signin', (req, res) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if(!user) {
        res.json({ message: "Email does no exists." })
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then(result => {
            if(result) {
              res.json({ message: "Sign in successful!!!", user: user })
            } else {
              res.json({ messsage: "Password incorrect!!!" })
            }
          })
      }
    })
})

module.exports = router;
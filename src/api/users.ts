import express, { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../models/User";

const router: Router = express.Router();

router.get("/test", (req: Request, res: Response) => {
  res.json({ test: "users working..." });
});

router.get("/getAll", (req: Request, res: Response) => {
  User.find().then((user) => res.json(user));
});

// Sign Up

router.get("/signup/test", (req: Request, res: Response) => {
  res.json({ signinTest: "signup working..." });
});

// Sign-up endpoint
router.post(
  "/signup",
  [body("email").isEmail()],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ message: "emailerror" });
    }

    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        res.json({ error: "emailExist" });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            // Store hash in your password DB.
            const newUser = new User({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hash,
              admin:
                req.body.email === "santaclous112@gmail.com"
                  ? "admin"
                  : "client",
            });
            newUser
              .save()
              .then(() => res.json({ message: "success" }))
              .catch((err) => res.json({ message: "failed" }));
          });
        });
      }
    });
  }
);

// Sign in

router.get("/signin/test", (req: Request, res: Response) => {
  res.json({ signinTest: "signin working..." });
});

router.post(
  "/signin",
  [body("email").isEmail()],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ message: "emailerror" });
    }
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        res.json({ message: "emailNotExist" });
      } else {
        bcrypt.compare(req.body.password, user.password).then((result) => {
          if (result) {
            res.json({ message: "success", user: user });
          } else {
            res.json({ message: "passwordError" });
          }
        });
      }
    });
  }
);

export default router;

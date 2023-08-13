import express from "express";
import {body, validationResult} from "express-validator";
import {
  forbidAuthUser,
  isMatchEmailAndPassword,
  ensureAuthUser,
} from "@/middlewares/authentication";
import {getUserByEmailWithPassword} from "@/models/user";

export const authRouter = express.Router();

/** A page to enter signup information */
authRouter.get("/signup", forbidAuthUser, (req, res) => {
  res.render("users/new", {
    user: {
      name: "",
      email: "",
      password: "",
    },
    errors: [],
  });
});

/** A page to enter login information */
authRouter.get("/login", forbidAuthUser, (req, res) => {
  res.render("users/login", {
    email: "",
    password: "",
    errors: [],
  });
});

/** An endpoint to log in */
authRouter.post(
  "/login",
  forbidAuthUser,
  body("email", "Email can't be blank").notEmpty(),
  body("password", "Password can't be blank").notEmpty(),
  body("custom").custom(isMatchEmailAndPassword),
  async (req, res, next) => {
    const {email, password} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("users/login", {
        email,
        password,
        errors: errors.array(),
      });
    }
    const user = await getUserByEmailWithPassword(email);
    if (!user) return next(new Error("Invalid error: The user is undefined."));
    req.authentication?.login(user);
    req.dialogMessage?.setMessage("You have logged in successfully");
    res.redirect("/posts");
  }
);

/** An endpoint to log out */
authRouter.delete("/logout", ensureAuthUser, async (req, res) => {
  req.authentication?.logout();
  req.dialogMessage?.setMessage("You have logged out successfully");
  res.redirect("/login");
});

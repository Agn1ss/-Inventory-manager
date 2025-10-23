import express from "express";
import passport from "../config/passport.js";
import userController from "../controllers/user-controller.js";

const oAuthRouter = express.Router();

oAuthRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

oAuthRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/api/oauth/failed" }),
  userController.login
);

// oAuthRouter.get("/github", passport.authenticate("github", { scope: ["email"] }));
// oAuthRouter.get(
//   "/github/callback",
//   passport.authenticate("github", { session: false, failureRedirect: "/api/oauth/failed" }),
//   userController.login
// );

oAuthRouter.get("/failed", (req, res) => {
  res.status(401).json({ message: "OAuth authentication failed" });
});

export default oAuthRouter;

import { Router } from "express";
import { body } from "express-validator";
import userController from "../controllers/user-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const userRouter = Router();

userRouter.post(
  "/registration",
  [
    body("email").isEmail().withMessage("inc. email"),
    body("password")
      .isString()
      .withMessage("inc. pass")
      .isLength({ min: 4 })
      .withMessage("inc. pass")
      .matches(/^\S+$/)
      .withMessage("inc. pass"),
    body("name").isString().notEmpty().withMessage("inc. name"),
  ],
  userController.registration
);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.get("/refresh", userController.refresh);
userRouter.get("/users", userController.getUsers);
userRouter.delete("/users/:id/delete", userController.delete);
userRouter.patch("/users/:id/block", userController.block);
userRouter.patch("/users/:id/unlock", userController.unlock);
userRouter.get("/inventories", authMiddleware, userController.getUserInventories);
userRouter.get("inventories/editable", authMiddleware, userController.getUserEditableInventories);

export default userRouter;

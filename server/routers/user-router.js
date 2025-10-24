import { Router } from "express";
import { body } from "express-validator";
import userController from "../controllers/user-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import inventoryAccessMiddleware from "../middlewares/inventory-access-middleware.js";
import roleMiddleware from "../middlewares/role-midlleware.js";

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
userRouter.get("/refresh", userController.refresh);//authMiddleware
userRouter.get("/users", userController.getUsers);
userRouter.delete("/users/:id/delete", userController.delete); //authMiddleware, roleMiddleware(["ADMIN"])
userRouter.patch("/users/:id/block", userController.block); //authMiddleware, roleMiddleware(["ADMIN"])
userRouter.patch("/users/:id/unlock", userController.unlock); //authMiddleware, roleMiddleware(["ADMIN"])
userRouter.get("/inventories", authMiddleware, userController.getUserInventories);
userRouter.get("inventories/editable", authMiddleware, userController.getUserEditableInventories);

export default userRouter;

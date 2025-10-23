import { Router } from "express";
import inventoryController from "../controllers/inventory-controller.js";
import categoryController from "../controllers/category-controller.js";
import tagController from "../controllers/tag-controller.js";
import commentController from "../controllers/comment-controller.js";
import itemController from "../controllers/item-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const inventoryRouter = Router();

inventoryRouter.post("/create", authMiddleware, inventoryController.create);
inventoryRouter.post("/:id/update", inventoryController.update);
inventoryRouter.get("/:id", inventoryController.getInventoryData);
inventoryRouter.get("/:id/editors", inventoryController.getInventoryEditors);
inventoryRouter.get("/:id/comments", commentController.getComments);
inventoryRouter.post("/:id/comments/create", commentController.createComment);
inventoryRouter.post("/:id/items/create",authMiddleware, itemController.create);
inventoryRouter.post("/:id/items/:id", itemController.getOne);
inventoryRouter.get("/categories", categoryController.getCategories);
inventoryRouter.get("/tags", tagController.getTags);

export default inventoryRouter;

import { Router } from "express";
import inventoryController from "../controllers/inventory-controller.js";
import categoryController from "../controllers/category-controller.js";
import tagController from "../controllers/tag-controller.js";
import commentController from "../controllers/comment-controller.js";
import itemController from "../controllers/item-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import inventoryAccessMiddleware from "../middlewares/inventory-access-middleware.js";

const inventoryRouter = Router();

inventoryRouter.post("/create", authMiddleware, inventoryController.create);
inventoryRouter.post("/:id/update", inventoryController.update); //authMiddleware, inventoryAccessMiddleware({allowEditors: false})
inventoryRouter.get("/:id", inventoryController.getInventoryData); //authMiddleware, inventoryAccessMiddleware({allowEditors: false})
inventoryRouter.get("/:id/editors", inventoryController.getInventoryEditors); //authMiddleware, inventoryAccessMiddleware({allowEditors: false})
inventoryRouter.get("/:id/comments", commentController.getComments); //authMiddleware,
inventoryRouter.post("/:id/comments/create", commentController.createComment); //authMiddleware,
inventoryRouter.post("/:id/items/create",authMiddleware, itemController.create); //authMiddleware, inventoryAccessMiddleware({allowEditors: true})
inventoryRouter.post("/:id/items/:itemId/update",authMiddleware, itemController.update); //authMiddleware, inventoryAccessMiddleware({allowEditors: true})
inventoryRouter.post("/:id/items/:itemId/delete",authMiddleware, itemController.delete); //authMiddleware, inventoryAccessMiddleware({allowEditors: true})
inventoryRouter.post("/:id/items/:itemId", itemController.getOne); //authMiddleware, inventoryAccessMiddleware({allowEditors: true})
inventoryRouter.get("/categories", categoryController.getCategories);
inventoryRouter.get("/tags", tagController.getTags);

export default inventoryRouter;

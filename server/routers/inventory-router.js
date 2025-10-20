import { Router } from "express";
import inventoryController from "../controllers/inventory-controller.js";
import categoryController from "../controllers/category-controller.js";

const inventoryRouter = Router();

inventoryRouter.post("/create", inventoryController.create);
// inventoryRouter.post("/update", inventoryController.update);
inventoryRouter.get("/categories", categoryController.getCategories);
// inventoryRouter.get("/tags", tagController.getTags);

export default inventoryRouter;

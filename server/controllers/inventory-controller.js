import inventoryService from "../services/inventory-service.js";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/api-error.js";

class InventoryController {
  async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation Error", errors.array()));
      }

      const inventoryData = await inventoryService.create(req.body);
      return res.json(inventoryData);
    } catch (e) {
      next(e);
    }
  }
}

const inventoryController = new InventoryController();
export default inventoryController;

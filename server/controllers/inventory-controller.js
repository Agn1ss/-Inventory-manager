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
      const creatorId = req.user.id;
      const inventoryData = await inventoryService.create(creatorId);
      return res.json(inventoryData);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const id = req.params.id;
      const  inventoryData  = req.body;
      const updatedInventoryData = await inventoryService.update(id, inventoryData);
  
      return res.json(updatedInventoryData);
    } catch (e) {
      next(e);
    }
  }
  
  async getInventoryData(req, res, next) {
    try {
      const id = req.params.id;
      const inventoryData = await inventoryService.getInventory(id);
  
      if (!inventoryData) {
        return next(ApiError.NotFound("Inventory not found"));
      }
  
      return res.json(inventoryData);
    } catch (e) {
      next(e);
    }
  }



  async getInventoryEditors(req, res, next) {
    try {
      const id = req.params.id;
      const { search, skip, take } = req.query;
      const editors = await inventoryService.getInventoryEditors(id, search, skip, take);

      return res.json(editors);
    } catch (e) {
      next(e);
    }
  }

}

const inventoryController = new InventoryController();
export default inventoryController;

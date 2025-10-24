import categoryService from "../services/category-service.js";
import itemService from "../services/item-service.js";

class ItemController {
  async create(req, res, next) {
    try {
      const inventoryId = req.params.id;
      const creatorId = req.user.id;

      const itemData = await itemService.create(inventoryId, creatorId);

      return res.json(itemData);
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const id = req.params.itemId;

      const itemData = await itemService.getOne(id);

      return res.json(itemData);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const inventoryId = req.params.id;
      const itemId = req.params.itemId;
      const itemData = req.body;

      const updatedItemData = await itemService.update(inventoryId, itemId, itemData);

      return res.json(updatedItemData);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.params.itemId;
      await itemService.delete(id);
      return res.json({ message: `User ${id} deleted successfully` });
    } catch (e) {
      next(e);
    }
  }


}

const itemController = new ItemController();
export default itemController;

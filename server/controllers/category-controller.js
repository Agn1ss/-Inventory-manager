import categoryService from "../services/category-service.js";

class CategoryController {
  async getCategories(req, res, next) {
    try {
      const searchQuery = req.query.search || "";
      const limit = parseInt(req.query.limit) || 5;

      const categories = await categoryService.getCategories(searchQuery, limit);

      return res.json(categories);
    } catch (e) {
      next(e);
    }
  }
}


const categoryController = new CategoryController();
export default categoryController;
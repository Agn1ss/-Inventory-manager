import categoryService from "../services/category-service.js";

class CategoryController {
  async getCategories(req, res, next) {
    try {
      const searchQuery = req.query.search || "";
      const limit = parseInt(req.query.limit) || 8;

      const categoriesData = await categoryService.getCategories(searchQuery, limit);

      return res.json(categoriesData);
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const id = req.params.id;
      const categoryData = categoryService.getOne(id);
      return res.json(categoryData);
    } catch (e) {
      next(e);
    }
  }
}

const categoryController = new CategoryController();
export default categoryController;

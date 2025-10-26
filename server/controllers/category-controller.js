import categoryService from "../services/category-service.js";

class CategoryController {
  async getCategories(req, res, next) {
    try {
      const { search = "", limit = 8 } = req.query;
  
      const categoriesData = await categoryService.getCategories({
        search,
        limit: Number(limit),
      });
  
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

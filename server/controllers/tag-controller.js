import tagService from "../services/tag-service.js";


class TagController {
  async getTags(req, res, next) {
    try {
      const searchQuery = req.query.search || "";
      const limit = parseInt(req.query.limit) || 8;

      const tags = await tagService.getTags(searchQuery, limit);

      return res.json(tags);
    } catch (e) {
      next(e);
    }
  }
}


const tagController = new TagController();
export default tagController;
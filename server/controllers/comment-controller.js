import commentService from "../services/comment-sevice.js";

class CommentController {
  async getComments(req, res, next) {
    try {
      const { id } = req.params;
      const { skip = 0, take = 20, after } = req.query;

      const commentsData = await commentService.getComments({
        itemId: id,
        skip: Number(skip),
        take: Number(take),
        after,
      });


      return res.json(commentsData);
    } catch (e) {
      next(e);
    }
  }

  async createComment(req, res, next) {
    try {
      const creatorId = req.user.id;
      const { text } = req.body;
      const id = req.params.id;
      const comments = await commentService.createComment(id, creatorId, text);

      return res.json(comments);
    } catch (e) {
      next(e);
    }
  }
}

const commentController = new CommentController();
export default commentController;

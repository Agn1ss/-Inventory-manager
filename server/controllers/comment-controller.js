import commentService from "../services/comment-sevice.js";

class CommentController {
  async getComments(req, res, next) {
    try {
      const id = req.params.id;
      const { skip, take, after } = req.query;

      const comments = await commentService.getComments(id, skip, take, after);

      const commentsData = comments.map((comment) => ({
        id: comment.id,
        text: comment.text,
        creatorName: comment.creator.name,
        createdAt: comment.createdAt,
      }));

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
      const comments = await commentService.createComment(id,creatorId, text);

      return res.json(comments);
    } catch (e) {
      next(e);
    }
  }

}

const commentController = new CommentController();
export default commentController;
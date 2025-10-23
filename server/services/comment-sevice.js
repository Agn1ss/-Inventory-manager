import prisma from "../prisma/prisma-client.js";

class CommentService {
  async getComments(inventoryId, skip = 0, take = 30, after) {
    if (!searchQuery || searchQuery.trim() === "") return [];

    const whereClause = after
      ? { inventoryId, createdAt: { gt: new Date(after) } }
      : { inventoryId };

    const comments = await prisma.comment.findMany({
      where: whereClause,
      orderBy: { createdAt: "asc" },
      skip: Number(skip),
      take: Number(take),
      include: {
        creator: { select: { id: true, name: true } },
      },
    });
    return comments;
  }


  async createComment(inventoryId, creatorId, text) {
    const comment = await prisma.comment.create({
      data: {
        text,
        inventoryId,
        creatorId,
      },
      include: {
        creator: { select: { id: true, name: true } },
      },
    });

    return {
      id: comment.id,
      text: comment.text,
      creatorName: comment.creator.name,
      createdAt: comment.createdAt,
    };
  }

}


const commentService = new CommentService();
export default commentService;
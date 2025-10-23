import prisma from "../prisma/prisma-client.js";
import ApiError from "../exceptions/api-error.js";

class TagService {
  async getTags(searchQuery, limit = 8) {
    if (!searchQuery || searchQuery.trim() === "") return [];

    const tags = await prisma.tag.findMany({
      where: {
        name: {
          endsWith: searchQuery,
          mode: "insensitive",
        },
      },
      take: limit,
      select: {
        id: true,
        name: true,
      },
    });

    return tags;
  }

  async setInventoryTags(tags, inventoryId, tx) {
    if (!tags || tags.length === 0 || !tx) {
      return { success: false };
    }
  
    const existingTags = await tx.tag.findMany({
      where: { name: { in: tags } },
    });
  
    const existingTagNames = existingTags.map(t => t.name);
    const newTagNames = tags.filter(name => !existingTagNames.includes(name));
  
    if (newTagNames.length > 0) {
      await tx.tag.createMany({
        data: newTagNames.map(name => ({ name })),
        skipDuplicates: true,
      });
    }
  
    const targetTags = await tx.tag.findMany({
      where: { name: { in: tags } },
      select: { id: true },
    });
  
    await tx.inventory.update({
      where: { id: inventoryId },
      data: {
        tags: {
          set: targetTags.map(tag => ({ id: tag.id })),
        },
      },
    });
  
    return { success: true };
  }
}

const tagService = new TagService();
export default tagService;

import prisma from "../prisma/prisma-client.js";

class TagService {
  async addMany(tags, inventoryId) {
    if (tags.length === 0) return;

    const existingTags = await prisma.tag.findMany({
      where: { name: { in: tags } },
    });

    const existingTagNames = existingTags.map(t => t.name);
    const newTagNames = tags.filter(name => !existingTagNames.includes(name));

    if (newTagNames.length > 0) {
      await prisma.tag.createMany({
        data: newTagNames.map(name => ({ name })),
        skipDuplicates: true,
      });
    }

    const allTags = await prisma.tag.findMany({
      where: { name: { in: tags } },
      select: { id: true, name: true },
    });

    await prisma.inventory.update({
      where: { id: inventoryId },
      data: {
        tags: {
          connect: allTags.map(tag => ({ id: tag.id })),
        },
      },
    });
  }
}

const tagService = new TagService();
export default tagService;

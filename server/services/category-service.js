import prisma from "../prisma/prisma-client.js";

class CategoryService {
  async getCategories(searchQuery, limit = 5) {
    if (!searchQuery || searchQuery.trim() === "") return [];

    const categories = await prisma.category.findMany({
      where: {
        name: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
      take: limit,
      select: {
        id: true,
        name: true,
      },
    });

    return categories;
  }
}


const categoryService = new CategoryService();
export default categoryService;
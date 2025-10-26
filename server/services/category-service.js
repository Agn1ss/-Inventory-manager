import ApiError from "../exceptions/api-error.js";
import prisma from "../prisma/prisma-client.js";

class CategoryService {
  async getCategories({ searchQuery, limit = 8 }) {
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

  async getOne(id) {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new ApiError.NotFound(`Category ${id} not founded`);
    }
    return category;
  }
}

const categoryService = new CategoryService();
export default categoryService;

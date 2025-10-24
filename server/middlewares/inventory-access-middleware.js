import ApiError from "../exceptions/api-error.js";
import prisma from "../prisma/prisma-client.js";

export default function inventoryAccessMiddleware(options = { allowEditors: true }) {
  return async (req, res, next) => {
    try {
      const user = req.user;
      const inventoryId = req.params.id;

      if (!user) return next(ApiError.UnauthorizedError());

      const inventory = await prisma.inventory.findUnique({
        where: { id: inventoryId },
        include: { editors: true },
      });

      if (!inventory) {
        return next(ApiError.NotFound(`Inventory with id "${inventoryId}" not found`));
      }

      if (user.role === "ADMIN") return next();

      if (inventory.creatorId === user.id) return next();

      if (options.allowEditors && !inventory.isPublic) {
        const isEditor = inventory.editors.some(e => e.userId === user.id);
        if (isEditor) return next();
      }

      return next(ApiError.Forbidden("You do not have access to this inventory"));
    } catch (e) {
      return next(ApiError.Forbidden("Access denied"));
    }
  };
}
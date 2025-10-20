import ApiError from "../exceptions/api-error.js";
import tokenService from "../service/token-service.js";
import prisma from "../prismaClient.js";

export default function roleMiddleware(roles = []) {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return next(ApiError.UnauthorizedError());
      }

      if (!roles.includes(req.user.role)) {
        return next(ApiError.Forbidden("You do not have permission to access this resource"));
      }

      if (user.isBlocked) return next(ApiError.Forbidden("This user is blocked"));

      next();
    } catch (e) {
      return next(ApiError.Forbidden("Access denied"));
    }
  };
}





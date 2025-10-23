import ApiError from "../exceptions/api-error.js";
import prisma from "../prisma/prisma-client.js";
import tokenService from "../services/token-service.js";
export default async function authMiddleware(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return next(ApiError.UnauthorizedError());

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) return next(ApiError.UnauthorizedError());

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) return next(ApiError.UnauthorizedError());

    const user = await prisma.user.findUnique({ where: { id: userData.id } });
    if (!user) return next(ApiError.UnauthorizedError());

    req.user = user;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
}

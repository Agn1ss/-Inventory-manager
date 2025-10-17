import userService from '../services/user-service.js'
import {validationResult} from 'express-validator'
import ApiError from '../exceptions/api-error.js'

class UserController {
    async registration(req, res, next) {
      try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return next(ApiError.BadRequest('Validation Error', errors.array()))
        }
        const {name,email,password} = req.body;
        const userData = await userService.registration(name,email,password);
        res.cookie('refreshToken',userData.refreshToken,{maxAge: 30*24*60*60*1000, httpOnly: true})
        return res.json(userData);
      } catch (e) {
        next(e);
      }
    }
  
    async login(req, res, next) {
      try {
        const {name,email,password} = req.body;
        const userData = await userService.login(name,email,password);
            res.cookie('refreshToken',userData.refreshToken,{maxAge: 30*24*60*60*1000, httpOnly: true})
        return res.json(userData);
      } catch (e) {
        next(e);
      }
    }
  
    async logout(req, res, next) {
      try {
        const {refreshToken} = req.cookies;
        const token = await userService.logout(refreshToken);
        res.clearCookie('refreshToken');
        return res.json(token);

      } catch (e) {
        next(e);
      }
    }
  
    async refresh(req, res, next) {
      try {
        const { refreshToken } = req.cookies;
        const userData = await userService.refresh(refreshToken);
        res.cookie('refreshToken', userData.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true
        });
        return res.json(userData);
      } catch (e) {
        next(e);
      }
    }
  
    async getUsers(req, res, next) {
      try {
        const users = await userService.getAllUsers();
        return res.json(users);
      } catch (e) {
        next(e);
      }
    }


    async delete(req, res, next) {
      try {
        const { id } = req.params;
        await userService.delete(id);
        return res.json({ message: `User ${id} deleted successfully` });
      } catch (e) {
        next(e);
      }
    }

    async block(req, res, next) {
      try {
        const { id } = req.params;
        await userService.block(id);
        return res.json({ message: `User ${id} blocked successfully` });
      } catch (e) {
        next(e);
      }
    }

    async unlock(req, res, next) {
      try {
        const { id } = req.params;
        await userService.unlock(id);
        return res.json({ message: `User ${id} unblocked successfully` });
      } catch (e) {
        next(e);
      }
    }
  }

  const userController = new UserController();
  export default userController;
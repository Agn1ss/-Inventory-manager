import { Router } from 'express';
import userController from '../controllers/user-controller.js';

const router = Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);
router.delete('/users/:id', userController.delete);
router.patch('/users/:id/block', userController.block);
router.patch('/users/:id/unlock', userController.unlock);

export default router;
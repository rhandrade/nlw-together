import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController';

import { ensureAdmin } from './middlewares/EnsureAdmin';
import { AutheticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserControler = new AutheticateUserController();
const createComplimentController = new CreateComplimentController();

router.post('/tags', ensureAdmin, createTagController.handle);
router.post('/users', createUserController.handle);
router.post('/login', authenticateUserControler.handle);
router.post('/compliment', createComplimentController.handle);

export { router }
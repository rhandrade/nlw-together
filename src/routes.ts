import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController';

import { ensureAdmin } from './middlewares/EnsureAdmin';
import { ensureAuthenticated } from './middlewares/EnsureAuthenticated';
import { AutheticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController';
import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController';
import { ListTagsController } from './controllers/ListTagsController';
import { ListUsersController } from './controllers/ListUsersController';

const router                               = Router();
const createUserController                 = new CreateUserController();
const createTagController                  = new CreateTagController();
const authenticateUserControler            = new AutheticateUserController();
const createComplimentController           = new CreateComplimentController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listUserSendComplimentsController    = new ListUserSendComplimentsController();
const listTagsController                   = new ListTagsController();
const listUsersController                  = new ListUsersController();


router.get(
    '/users',
    ensureAuthenticated,
    listUsersController.handle
);

router.post(
    '/users', 
    createUserController.handle
);

router.post(
    '/login', 
    authenticateUserControler.handle
);

router.get(
    '/tags', 
    ensureAuthenticated, 
    listTagsController.handle
);

router.post(
    '/tags', 
    ensureAuthenticated, 
    ensureAdmin, 
    createTagController.handle
);

router.post(
    '/compliments', 
    ensureAuthenticated, 
    createComplimentController.handle
);

router.get(
    '/users/compliments/send',
    ensureAuthenticated,
    listUserSendComplimentsController.handle
);

router.get(
    '/users/compliments/receive', 
    ensureAuthenticated, 
    listUserReceiveComplimentsController.handle
);


export { router }
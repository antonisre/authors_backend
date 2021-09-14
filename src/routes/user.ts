import express from 'express';
import { signup, signin, deleteUser, updateUser, getBooks } from '../controllers/user';
import { celebrate } from 'celebrate';
import { validationSignin, validationSignup, validationGetUsersBooks } from '../validation/user';
import { requireAdmin } from '../middlewares/requireAdmin';
import { requireToken } from '../middlewares/requireToken';

const router = express.Router();

router.post('/signup', celebrate(validationSignup), signup);
router.post('/signin', celebrate(validationSignin), signin);
router.delete('/:id', requireAdmin, deleteUser);
router.put('/:id', requireAdmin, updateUser);
router.get('/books', requireToken, celebrate(validationGetUsersBooks), getBooks);

export default router;
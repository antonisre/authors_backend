import express from 'express';
import { signup, signin, deleteUser, updateUser } from '../controllers/user';
import { celebrate } from 'celebrate';
import { validationSignin, validationSignup } from '../validation/user';
import { requireAdmin } from '../middlewares/requireAdmin';

const router = express.Router();

router.post('/signup', celebrate(validationSignup), signup);
router.post('/signin', celebrate(validationSignin), signin);
router.delete('/:id', requireAdmin, deleteUser);
router.put('/:id', requireAdmin, updateUser);

export default router;
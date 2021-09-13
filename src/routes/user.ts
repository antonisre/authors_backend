import express from 'express';
import { signup, signin, deleteUser } from '../controllers/user';
import { celebrate } from 'celebrate';
import { validationSignin, validationSignup } from '../validation/user';
import { requireAdmin } from '../middlewares/requireAdmin';

const router = express.Router();

router.post('/signup', celebrate(validationSignup), signup);
router.post('/signin', celebrate(validationSignin), signin);
router.delete('/:id', requireAdmin, deleteUser);

export default router;
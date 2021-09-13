import express from 'express';
import { signup, signin, deleteUser } from '../controllers/user';
import { celebrate } from 'celebrate';
import { validationSignin, validationSignup, validationDeleteUser } from '../validation/user';

const router = express.Router();

router.post('/signup', celebrate(validationSignup), signup);
router.post('/signin', celebrate(validationSignin), signin);
router.delete('/:id', celebrate(validationDeleteUser), deleteUser);

export default router;
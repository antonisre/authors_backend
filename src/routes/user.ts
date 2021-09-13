import express from 'express';
import { signup, signin } from '../controllers/user';
import { celebrate } from 'celebrate';
import { validationSignin, validationSignup } from '../validation/user';

const router = express.Router();

router.post('/signup', celebrate(validationSignup), signup);
router.post('/signin', celebrate(validationSignin), signin);

export default router;
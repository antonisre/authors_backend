  
import express from 'express';
import user from './user';
import book from './book';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from '../../swagger.json';
swaggerSpec.host = "/";

const router = express.Router();

router.use('/user', user);
router.use('/book', book);
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default router;
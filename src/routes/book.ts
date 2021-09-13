import express from 'express';
import { addNewBook, updateBook, getById, deleteBook, getAllBooks } from '../controllers/book';
import { celebrate } from 'celebrate';
import { validationCreateBook, validationUpdateBook, validationGetAllBooks } from '../validation/book';
import { requireToken } from '../middlewares/requireToken';

const router = express.Router();

router.post('/', requireToken, celebrate(validationCreateBook), addNewBook);
router.put('/:id', requireToken, celebrate(validationUpdateBook), updateBook);
router.delete('/:id', requireToken, deleteBook);
router.get('/', celebrate(validationGetAllBooks), requireToken, getAllBooks);
router.get('/:id', requireToken, getById);

export default router;
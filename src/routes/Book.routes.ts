import express from 'express';
import BookController from '../controllers/Books.controllers';

const router = express.Router();

router.post('/create', BookController.createBook);
router.get('/readBook/:bookId', BookController.readBook);
router.get('/all', BookController.readAllBook);
router.put('/updateBook/:bookId', BookController.updateBook);
router.delete('/deleteBook/:bookId', BookController.deleteBook);

export = router;

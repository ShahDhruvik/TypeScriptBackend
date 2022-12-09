import express from 'express';
import AuthorController from '../controllers/Author.Controllers';

const router = express.Router();

router.post('/create', AuthorController.createAuthor);
router.get('/readAuthor/:authorId', AuthorController.readAuthor);
router.get('/all', AuthorController.readAllAuthor);
router.put('/updateAuthor/:authorId', AuthorController.updateAuthor);
router.delete('/deleteAuthor/:authorId', AuthorController.deleteAuthor);

export = router;

import express from 'express';
import UserController from '../controllers/User.controllers';

const router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

// router.get('/readAuthor/:authorId', AuthorController.readAuthor);
// router.get('/all', AuthorController.readAllAuthor);
// router.put('/updateAuthor/:authorId', AuthorController.updateAuthor);
// router.delete('/deleteAuthor/:authorId', AuthorController.deleteAuthor);

export = router;

import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Book from '../models/Book';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, Author } = req.body;
        const book = new Book({
            id: mongoose.Types.ObjectId,
            title,
            Author
        });
        await book.save();
        res.send('created').status(201);
    } catch (error) {
        res.status(400).send(error);
    }
};
const readBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bookId } = req.params;
        const bookData = await Book.findById(bookId);
        res.send(bookData);
    } catch (error) {
        res.status(400).send(error);
    }
};
const readAllBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allBookData = await Book.find().populate('Author');
        res.send(allBookData);
    } catch (error) {
        res.status(400).send(error);
    }
};
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bookId } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, { new: true });
        res.send(updatedBook);
    } catch (error) {
        res.status(400).send(error);
    }
};
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bookId } = req.params;
        const deleteBook = await Book.findByIdAndDelete(bookId);
        res.send('Author deleted');
    } catch (error) {
        res.status(400).send(error);
    }
};

export default { deleteBook, updateBook, readAllBook, readBook, createBook };

import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Author from '../models/Author';

const createAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const author = new Author({
            id: mongoose.Types.ObjectId,
            name
        });
        await author.save();
        res.send('created').status(201);
    } catch (error) {
        res.status(400).send(error);
    }
};
const readAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorId } = req.params;
        const authorData = await Author.findById(authorId);
        res.send(authorData);
    } catch (error) {
        res.status(400).send(error);
    }
};
const readAllAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allAuthorData = await Author.find();
        res.send(allAuthorData);
    } catch (error) {
        res.status(400).send(error);
    }
};
const updateAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorId } = req.params;
        const updatedAuthor = await Author.findByIdAndUpdate(authorId, req.body, { new: true });
        res.send(updatedAuthor);
    } catch (error) {
        res.status(400).send(error);
    }
};
const deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorId } = req.params;
        const deleteAuthor = await Author.findByIdAndDelete(authorId);
        res.send('Author deleted');
    } catch (error) {
        res.status(400).send(error);
    }
};

export default { deleteAuthor, updateAuthor, readAllAuthor, readAuthor, createAuthor };

import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import dotenv from 'dotenv';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
dotenv.config();
const saltRounds = 10;
// const myPlaintextPassword = 's0//P4$$w0rD';
const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { Username, email, phone, password } = req.body;

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = bcrypt.hashSync(password, salt);
        const user = new User({
            id: mongoose.Types.ObjectId,
            Username,
            email,
            phone,
            password: hashPassword
        });

        await user.save();
        res.status(201).send('created');
    } catch (error) {
        res.status(400).send(error);
    }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.find({
            email: email
        });
        console.log(user);

        // if (user) {
        //     bcrypt.compare(password, user.password, (err: Error, result: any) => {
        //         if (err) {
        //             res.send('password does not match');
        //         }
        //         const token = jwt.sign({ name: username, email }, 'verysecretkry', { expiresIn: '500s' });
        //         if (result) {
        //             res.send(token);
        //         }
        //     });
        // }
        res.send('user not found');
    } catch (error) {
        res.status(400).send(error);
    }
};

export default { registerUser, loginUser };

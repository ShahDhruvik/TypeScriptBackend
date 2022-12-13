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
        res.sendStatus(201).json({ message: 'created' });
    } catch (error) {
        res.sendStatus(400).json(error);
    }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email
        });
        if (user) {
            await bcrypt.compare(password, user.password, (err: Error, result: any) => {
                if (err) {
                    res.send(err);
                }
                if (result) {
                    const token = jwt.sign({ email: user.email }, 'verysecretkry', { expiresIn: '500s' });
                    res.send({ message: 'Login successful', token });
                } else {
                    res.send({ message: 'Password does not match' });
                }
            });
        } else res.send({ message: 'user not found' });
    } catch (error) {
        res.send(error).status(400);
    }
};

export default { registerUser, loginUser };

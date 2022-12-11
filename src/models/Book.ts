import mongoose, { Document, Schema } from 'mongoose';

export interface IBook {
    title: string;
    Author: string;
}

export interface IBookModel extends IBook, Document {}

const BookSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        Author: { type: mongoose.Types.ObjectId, required: true, ref: 'Author' }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IBookModel>('Books', BookSchema);

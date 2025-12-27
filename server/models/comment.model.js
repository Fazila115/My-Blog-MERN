import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
    post: { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    text: { type: String, required: true }
}, { timestamps: true });

const Comment = model('comment', commentSchema);

export default Comment;
import { Schema, model } from "mongoose";

const postSchema = new Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

const Post = model("Post", postSchema);
export default Post;

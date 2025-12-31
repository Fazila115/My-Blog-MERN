import mongoose from 'mongoose';
import Post from '../models/post.model.js';

// 1. get all posts - GET
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();

        if (posts.length === 0) {
            return res.status(200).json({ ok: true, message: 'No posts found!', totalPosts: 0, posts: [] });
        }
        else {
            return res.status(200).json({ ok: true, message: `Total available posts: ${posts.length}`, totalPosts: posts.length, posts })
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message, message: 'Server Error' });
    }
};

// 2. get single post by id - GET
const getSinglePost = async (req, res) => {
    try {
        const { id } = req.params.id;
        const post = await Post.findById(id);

        if (!id) {
            return res.status(400).json({ ok: false, message: 'Post ID is required!!' });
        }
        if (!post) {
            return res.status(404).json({ ok: false, message: 'Post not found!' });
        }

        return res.status(200).json({ ok: true, message: 'Post fetched successfully!', post });
    }
    catch (error) {
        return res.status(500).json({ error: error.message, message: 'Server Error' });
    }
};

// 3. add post - POST
const addPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const author = req.user?.id;
        const image = req.file?.path;

        if (!title || !content || !image || !author) {
            return res.status(400).json({ ok: false, message: "All fields are required!", });
        }
        if (title.trim().length < 3 || title.trim().length > 20) {
            return res.status(400).json({ ok: false, message: "Title must be between 3 and 20 characters!", });
        }
        if (content.trim().length < 10 || content.trim().length > 1000) {
            return res.status(400).json({ ok: false, message: "Content must be between 10 and 1000 characters!", });
        }
        if (!mongoose.Types.ObjectId.isValid(author)) {
            return res.status(400).json({ ok: false, message: "Valid author ID is required!", });
        }

        const newPost = await Post.create({
            title: title.trim(),
            content: content.trim(),
            author,
            image,
            likes: [],
        });

        return res.status(201).json({ ok: true, message: "Post added successfully!", post: newPost, });
    }
    catch (error) {
        return res.status(500).json({ error: error.message, message: "Server Error" });
    }
};

// 4. update/edit single post by id - PUT
const editPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const image = req.file?.path;
        const userId = req.user?.id;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ ok: false, message: "Valid post ID is required!", });
        }
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ ok: false, message: "Post not found!", });
        }
        if (post.author.toString() !== userId) {
            return res.status(403).json({ ok: false, message: "You are not allowed to edit this post!", });
        }
        if (title && (title.trim().length < 3 || title.trim().length > 20)) {
            return res.status(400).json({ ok: false, message: "Title must be between 3 and 20 characters!", });
        }
        if (content && (content.trim().length < 10 || content.trim().length > 1000)) {
            return res.status(400).json({ ok: false, message: "Content must be between 10 and 1000 characters!", });
        }

        if (title) post.title = title.trim();
        if (content) post.content = content.trim();
        if (image) post.image = image;

        await post.save();

        return res.status(200).json({ ok: true, message: "Post updated successfully!", post, });

    } catch (error) {
        return res.status(500).json({ error: error.message, message: "Server Error" });
    }
};

// 5. delete single post by id - DELETE
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;
        const post = await Post.findById(id);

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ ok: false, message: 'Valid Post ID is required!' });
        }
        if (!post) {
            return res.status(404).json({ ok: false, message: 'Post not found!' });
        }
        if (post.author.toString() !== userId) {
            return res.status(403).json({ ok: false, message: "You are not allowed to delete this post", });
        }

        await Post.findByIdAndDelete(id);

        return res.status(200).json({ ok: true, message: 'Post deleted successfull!' });
    }
    catch (error) {
        return res.status(500).json({ error: error.message, message: 'Server Error' });
    }
};

// 6. delete bulk posts by ids - POST
const bulkDeletePosts = async (req, res) => {
    try {

    }
    catch (error) {
        return res.status(500).json({ error: error.message, message: 'Server Error' });
    }
};

export { getAllPosts, getSinglePost, editPost, deletePost, bulkDeletePosts, addPost };
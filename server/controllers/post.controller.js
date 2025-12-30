import Post from '../models/post.model.js';

// 1. get all posts - GET
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();

        if (posts.length === 0) {
            return res.status(200).json({ ok:true, message: 'No posts found!',totalPosts: 0, posts: [] });
        }
        else {
            return res.status(200).json({ ok: true, message: `Total available posts: ${posts.length}`,totalPosts: posts.length, posts })
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message, message: 'Server Error' });
    }
};

// 2. get single post by id - GET
const getSinglePost = async (req, res) => {
    try {

    }
    catch (error) {
        return res.status(500).json({ error: error.message, message: 'Server Error' });
    }
};

// 3. add post - POST
const addPost = async (req, res) => {
    try {

    }
    catch (error) {
        return res.status(500).json({ error: error.message, message: 'Server Error' });
    }
};

// 4. update/edit single post by id - PUT
const editPost = async (req, res) => {
    try {

    }
    catch (error) {
        return res.status(500).json({ error: error.message, message: 'Server Error' });
    }
};

// 5. delete single post by id - DELETE
const deletePost = async (req, res) => {
    try {

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
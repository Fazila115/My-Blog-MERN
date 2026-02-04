import * as postService from '../services/post.service.js';

// 1. Get all posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPostsService();
        res.status(200).json({
            ok: true,
            totalPosts: posts.length,
            posts
        });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};

// 2. Get single post
export const getSinglePost = async (req, res) => {
    try {
        const post = await postService.getSinglePostService(req.params.id);
        res.status(200).json({ ok: true, post });
    } catch (error) {
        res.status(400).json({ ok: false, message: error.message });
    }
};

// 3. Add post
export const addPost = async (req, res) => {
    try {
        const post = await postService.addPostService(
            { ...req.body, image: req.file?.path },
            req.user?.id
        );

        res.status(201).json({ ok: true, post });
    } catch (error) {
        res.status(400).json({ ok: false, message: error.message });
    }
};

// 4. Edit post
export const editPost = async (req, res) => {
    try {
        const post = await postService.editPostService(
            req.params.id,
            { ...req.body, image: req.file?.path },
            req.user?.id
        );

        res.status(200).json({ ok: true, post });
    } catch (error) {
        res.status(400).json({ ok: false, message: error.message });
    }
};

// 5. Delete post
export const deletePost = async (req, res) => {
    try {
        await postService.deletePostService(req.params.id, req.user?.id);
        res.status(200).json({ ok: true, message: "Post deleted successfully" });
    } catch (error) {
        res.status(400).json({ ok: false, message: error.message });
    }
};

// 6. Bulk delete
export const bulkDeletePosts = async (req, res) => {
    try {
        const deletedCount = await postService.bulkDeletePostsService(
            req.body.ids,
            req.user?.id
        );

        res.status(200).json({
            ok: true,
            message: `${deletedCount} post(s) deleted`
        });
    } catch (error) {
        res.status(400).json({ ok: false, message: error.message });
    }
};

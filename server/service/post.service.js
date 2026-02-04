import mongoose from 'mongoose';
import { findAllPosts, findPostById, createPost, savePost, deletePostById, findPostsByIds } from '../repository/post.repository.js';

// 1. Get all posts
export const getAllPostsService = async () => {
    const posts = await findAllPosts();
    return posts;
};

// 2. Get single post
export const getSinglePostService = async (id) => {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Valid post ID is required");
    }

    const post = await findPostById(id);
    if (!post) throw new Error("Post not found");

    return post;
};

// 3. Add post
export const addPostService = async (data, userId) => {
    const { title, content, image } = data;

    if (!title || !content || !image || !userId)
        throw new Error("All fields are required");

    if (title.trim().length < 3 || title.trim().length > 20)
        throw new Error("Title must be between 3 and 20 characters");

    if (content.trim().length < 10 || content.trim().length > 1000)
        throw new Error("Content must be between 10 and 1000 characters");

    if (!mongoose.Types.ObjectId.isValid(userId))
        throw new Error("Invalid author ID");

    return await createPost({
        title: title.trim(),
        content: content.trim(),
        author: userId,
        image,
        likes: []
    });
};

// 4. Edit post
export const editPostService = async (id, data, userId) => {
    if (!mongoose.Types.ObjectId.isValid(id))
        throw new Error("Valid post ID required");

    const post = await findPostById(id);
    if (!post) throw new Error("Post not found");

    if (post.author.toString() !== userId)
        throw new Error("Not authorized to edit this post");

    const { title, content, image } = data;

    if (title) {
        if (title.trim().length < 3 || title.trim().length > 20)
            throw new Error("Invalid title length");
        post.title = title.trim();
    }

    if (content) {
        if (content.trim().length < 10 || content.trim().length > 1000)
            throw new Error("Invalid content length");
        post.content = content.trim();
    }

    if (image) post.image = image;

    return await savePost(post);
};

// 5. Delete post
export const deletePostService = async (id, userId) => {
    if (!mongoose.Types.ObjectId.isValid(id))
        throw new Error("Valid post ID required");

    const post = await findPostById(id);
    if (!post) throw new Error("Post not found");

    if (post.author.toString() !== userId)
        throw new Error("Not authorized to delete");

    await deletePostById(id);
};

// 6. Bulk delete
export const bulkDeletePostsService = async (ids, userId) => {
    if (!Array.isArray(ids) || ids.length === 0)
        throw new Error("Array of IDs required");

    const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));
    if (validIds.length === 0)
        throw new Error("No valid IDs provided");

    const posts = await findPostsByIds(validIds);

    let deletedCount = 0;

    for (const post of posts) {
        if (post.author.toString() === userId) {
            await deletePostById(post._id);
            deletedCount++;
        }
    }

    return deletedCount;
};

import Post from '../models/post.model.js';

// 1. Get all posts
export const findAllPosts = async () => {
    return await Post.find();
};

// 2. Find post by ID
export const findPostById = async (id) => {
    return await Post.findById(id);
};

// 3. Create post
export const createPost = async (postData) => {
    return await Post.create(postData);
};

// 4. Save updated post
export const savePost = async (post) => {
    return await post.save();
};

// 5. Delete post by ID
export const deletePostById = async (id) => {
    return await Post.findByIdAndDelete(id);
};

// 6. Find posts by IDs
export const findPostsByIds = async (ids) => {
    return await Post.find({ _id: { $in: ids } });
};

import Post from '../models/post.model.js';
import Comment from '../models/comment.model.js';

// Count total posts
export const countTotalPosts = async () => {
    return await Post.countDocuments();
};

// Count total comments
export const countTotalComments = async () => {
    return await Comment.countDocuments();
};

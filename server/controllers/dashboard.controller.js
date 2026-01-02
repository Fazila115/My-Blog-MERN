import Post from '../models/post.model.js'
import Comment from '../models/comment.model.js';

const overviewPlatform = async (req, res) => {
    try {
        const totalPosts = await Post.countDocuments();
        const totalComments = await Comment.countDocuments();

        return res.status(200).json({
            ok: true,
            message: 'Get overview successfully!',
            totalComments: totalComments,
            totalPosts: totalPosts
        })
    }
    catch (error) {
        return res.status(500).json({ error: error.message, message: 'Server Error' });
    }
};

export default overviewPlatform;
import { countTotalPosts, countTotalComments } from '../repository/dashboard.repository.js';

// Get platform overview statistics
export const overviewPlatformService = async () => {

    const totalPosts = await countTotalPosts();
    const totalComments = await countTotalComments();

    return {
        totalPosts,
        totalComments
    };
};

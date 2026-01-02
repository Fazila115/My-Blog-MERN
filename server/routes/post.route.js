import express from 'express';
import { addPost, bulkDeletePosts, deletePost, editPost, getAllPosts, getSinglePost } from '../controllers/post.controller.js';

const postRouter = express.Router();

postRouter.get('/', getAllPosts)
    .post('/add', addPost)
    .post('/bulk-delete', bulkDeletePosts)

    .get('/:id', getSinglePost)
    .put('/edit/:id', editPost)
    .delete('/delete/:id', deletePost)

export default postRouter;

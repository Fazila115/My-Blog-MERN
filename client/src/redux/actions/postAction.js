import axios from 'axios';
import { setError, setLoading, setPost, setPosts } from '../slices/postSlice.js';

// 1. get all posts
const getAllPosts = () => async (dispatch) => {
    dispatch(setLoading());
    try {
        const response = await axios({ url: ``, method: '' });
        return;
    }
    catch (error) {
        const message = response?.error?.message || error.message || "No Posts Found!";
        dispatch(setError(message));
        return;
    }
};

// 2. get user posts
const getUserPosts = () => async (dispatch) => {
    dispatch(setLoading());
    try {
        const response = await axios({ url: ``, method: '' });
        return;
    }
    catch (error) {
        const message = response?.error?.message || error.message || "No posts found!";
        dispatch(setError(message));
        return;
    }
};

// 3. add posts
const addPost = (formData) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const response = await axios({ url: ``, method: '' });
        return;
    }
    catch (error) {
        const message = response?.error?.message || error.message || "Failed to add post!";
        dispatch(setError(message));
        return;
    }
};

// 4. edit post
const editPost = (formData) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const response = await axios({ url: ``, method: '' });
        return;
    }
    catch (error) {
        const message = response?.error?.message || error.message || "Failed to edit post!";
        dispatch(setError(message));
        return;
    }
};

// 5. delete post
const deletePost = (id) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const response = await axios({ url: ``, method: '' });
        return;
    }
    catch (error) {
        const message = response?.error?.message || error.message || "Failed to delete post!";
        dispatch(setError(message));
        return;
    }
};

// 6. bulk delete posts
const bulkDeletePosts = (id, formData) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const response = await axios({ url: ``, method: '' });
        return;
    }
    catch (error) {
        const message = response?.error?.message || error.message || "Failed to delete posts!";
        dispatch(setError(message));
        return;
    }
};

// 7. user dashboard plateform overview
const overview = () => async (dispatch) => {
    dispatch(setLoading());
    try {
        const response = await axios({ url: ``, method: '' });
        return;
    }
    catch (error) {
        const message = response?.error?.message || error.message || "Failed to get overview data!";
        dispatch(setError(message));
        return;
    }
};

export { getAllPosts, getUserPosts, addPost, editPost, deletePost, bulkDeletePosts, overview};
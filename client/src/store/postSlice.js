import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts: [],
    post: null,
    error: null,
    success: null,
    loading: false
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        steError: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
            state.success = null;
        },
        setSuccess: (state, { payload }) => {
            state.success = payload;
            state.loading = false;
            state.error = null;
        },
        setPosts: (state, { payload }) => {
            state.posts = payload || [];
            state.loading = false;
            state.error = null;
            state.success = null;
        },
        setPost: (state, { payload }) => {
            state.post = payload;
            state.loading = false;
            state.error = null;
            state.success = null;
        }
    }
});

export default postSlice.reducer;
export const { setLoading, setSuccess, setPosts, setPost, setError } = postSlice.actions;
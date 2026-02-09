import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    error: null,
    success: null,
    loading: false
};

const authSlice = createSlice({
    name: 'auth',
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
        setUser: (state, { payload }) => {
            state.user = payload;
            state.loading = false;
            state.error = null;
            state.success = null;
        }
    }
});

export default authSlice.reducer;
export const { setLoading, setSuccess, setUser, setError } = authSlice.actions;
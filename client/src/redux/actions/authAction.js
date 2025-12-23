import axios from 'axios';
import { setError, setLoading, setUser } from '../slices/authSlice.js';

// 1. signup function
const signup = (formData) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const response = await axios({ url: ``, method: '' });
        return;
    }
    catch (error) {
        const message = response?.error?.message || error.message || "Signup Failed!";
        dispatch(setError(message));
        return;
    }
};

//2. login function
const login = (formData) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const response = await axios({ url: ``, method: '' });
        return;
    }
    catch (error) {
        const message = response?.error?.message || error.message || "Login Failed!";
        dispatch(setError(message));
        return;
    }
};

// 3. logout function
const logout = () => async (dispatch) => {
    dispatch(setLoading());
    try {
        return;
    }
    catch (error) {
        const message = response?.error?.message || error.message || "Logout Failed!";
        dispatch(setError(message));
        return;
    }
};

export { signup, login, logout };
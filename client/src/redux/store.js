import { combineReducers, configureStore } from '@reduxjs/toolkit';
import auth from './slices/authSlice.js';
import post from './slices/postSlice.js';

const reducer = combineReducers({
    auth: auth,
    post: post
});
const store = configureStore({reducer});
export default store;
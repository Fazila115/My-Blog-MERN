import { combineReducers, configureStore } from '@reduxjs/toolkit';
import auth from './authSlice.js';
import post from './postSlice.js';

const reducer = combineReducers({
    auth: auth,
    post: post
});
const store = configureStore({reducer});
export default store;
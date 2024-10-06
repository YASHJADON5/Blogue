import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from './blogSlice'
import SavedBlogsReducer from './savedBlogSlice';
import userReducer from './userSlice'


export default configureStore({
    reducer:{
        blogs:blogsReducer,
        savedBlogs:SavedBlogsReducer,
        user:userReducer

    }
});

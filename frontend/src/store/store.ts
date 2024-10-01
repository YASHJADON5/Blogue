import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from './blogSlice'
import SavedBlogsReducer from './savedBlogSlice';


export default configureStore({
    reducer:{
        blogs:blogsReducer,
        savedBlogs:SavedBlogsReducer
    }
});

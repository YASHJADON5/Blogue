import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from './blogSlice'


export default configureStore({
    reducer:{
        blogs:blogsReducer
    }
});

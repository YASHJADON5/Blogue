import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of a Blog object


export const savedBlogSlice = createSlice({
    name: "savedBlogs",
    initialState: {
        savedBlogs:[],
        savedPageBlogs:[],
        singleBlogSaved:"" 
    },
    reducers: {
        addSavedBlogs(state, action) {    
            state.savedBlogs=action.payload
        },
        addSavedPageBlogs(state, action) {    
            state.savedPageBlogs=action.payload
        },
        addSingleBlogSaved(state, action) {    
            state.singleBlogSaved=action.payload
        }
    }
});

export const { addSavedBlogs,addSavedPageBlogs,addSingleBlogSaved } = savedBlogSlice.actions;

export default savedBlogSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';




export const savedBlogSlice = createSlice({
    name: "savedBlogs",
    initialState: {
        savedBlogs:[],
        savedPageBlogs:[],
        singleBlogSaved:"",
        myBlogsSaved:[] 
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
        },
        addmyBlogsSaved(state, action) {    
            state.myBlogsSaved=action.payload
        },
    }
});

export const { addSavedBlogs,addSavedPageBlogs,addSingleBlogSaved,addmyBlogsSaved } = savedBlogSlice.actions;

export default savedBlogSlice.reducer;

import {createSlice} from '@reduxjs/toolkit'


export const savedBlogSlice= createSlice({
    name:"savedBlogs",
    initialState:{
        savedBlogs:[]
    },
    reducers:{
        addSavedBlogs(state,action){         
            state.savedBlogs=action.payload
        }
    }
})

export const {addSavedBlogs} = savedBlogSlice.actions

export default savedBlogSlice.reducer
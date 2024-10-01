
import {createSlice} from '@reduxjs/toolkit'


export const blogSlice= createSlice({
    name:"blogs",
    initialState:{
        blogs:null
    },
    reducers:{
        addBlogs(state,action){         
            state.blogs=action.payload
        }
    }
})

export const {addBlogs} = blogSlice.actions

export default blogSlice.reducer


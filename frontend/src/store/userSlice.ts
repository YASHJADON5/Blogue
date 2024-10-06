import { createSlice } from "@reduxjs/toolkit"


export const userSlice = createSlice({
    name: "user",
    initialState: {
        username:""
    },
    reducers: {
       addUserName(state,action){
        state.username= action.payload
       }
    }
});

export const {addUserName}  = userSlice.actions

export default userSlice.reducer
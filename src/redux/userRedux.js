import {createSlice} from "@reduxjs/toolkit"

//Action
const userSlice = createSlice({
    name : "user",
    initialState : {
        currentUser : null,
        isFetching : false,
        error : false,
        isSuccess  : false,
    },
    reducers : {
        loginStart : (state) => {
            state.isFetching = true
        },
        loginSuccess : (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.isSuccess = true;    
        },
        loginFailure : (state) => {
            state.isFetching = false;
            state.error = true;
        },
        updateStart : (state) =>{
            state.isFetching = true
        },
        updateSuccess : (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.isSuccess = true;    
        },
        updateFailure : (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const {loginStart, loginSuccess, loginFailure,updateStart, updateSuccess, updateFailure} = userSlice.actions;
export default userSlice.reducer;
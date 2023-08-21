import {createSlice} from '@reduxjs/toolkit';

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories:"",
    },
    reducers:{
        getAllCategoires:(state,action)=>{
            state.categories = action.payload
        },
        addCategory: (state,action) =>{
            state.categories = [...state.categories,action.payload]
        }
    }
})

export const { 
    getAllCategoires,
    addCategory,
 } = categorySlice.actions

export default categorySlice.reducer
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
        },
        deleteCategory: (state,action)=>{
            const newArray = state.categories.filter(category=>{
                return category._id !== action.payload
            })
            state.categories = newArray
        },
        updateCategory:(state,action)=>{
            const update = action.payload
            const newArray = state.categories.filter(category=>{
                return category._id !== update._id
            })
            state.categories = [...newArray,update]
        },
    }
})

export const { 
    getAllCategoires,
    addCategory,
    deleteCategory,
    updateCategory,
 } = categorySlice.actions

export default categorySlice.reducer
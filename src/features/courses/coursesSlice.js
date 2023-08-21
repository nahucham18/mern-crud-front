import {createSlice} from '@reduxjs/toolkit';

export const coursesSlice = createSlice({
    name: 'courses',
    initialState:{
        courses: "",
        filterCourses: ""
    },
    reducers:{
        getAllCourses: (state,action)=>{
            state.courses = action.payload
            state.filterCourses = action.payload
        },
        searchCourses: (state,action)=>{
            if(!action.payload || action.payload === 'all'){
                state.filterCourses = state.courses
            }else{
                const coursesForCategory = state.courses.filter(course=>{
                    return course.category._id === action.payload
                })
                state.filterCourses = coursesForCategory
            }
        }
    }

})

export const {
    getAllCourses,
    searchCourses,
} = coursesSlice.actions

export default coursesSlice.reducer
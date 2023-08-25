import { createSlice } from '@reduxjs/toolkit';

export const coursesSlice = createSlice({
    name: 'courses',
    initialState: {
        courses: "",
        filterCourses: "",
        filterUpdatedCourses: []
    },
    reducers: {
        getAllCourses: (state, action) => {
            state.courses = action.payload
            state.filterCourses = action.payload
        },
        searchCourses: (state, action) => {
            if (!action.payload || action.payload === 'all') {
                state.filterCourses = state.courses
            } else {
                const coursesForCategory = state.courses.filter(course => {
                    return (course?.category?._id === action.payload) && (course.category !== null)
                })
                state.filterCourses = coursesForCategory
            }
        },
        addCourse: (state, action) => {
            state.courses = [...state.courses, action.payload]
        },
        sortCourses: (state, action) => {
            const { order, title } = action.payload;

            const sorted = [...state.filterCourses].sort((a, b) => {
                if (order === 'asc') {
                    return a[title].localeCompare(b[title])
                } else {
                    return b[title].localeCompare(a[title])
                }
            })

            state.filterCourses = sorted

        },
        updateCourse:(state,action)=>{
            const update = action.payload
            const newArray = state.courses.filter(course=>{
                return course._id !== update._id
            })
            state.courses = [...newArray,update]
            state.filterCourses = [...newArray,update]
        },
        sortUpdatedCourse: (state, action) => {
            const sorted = [...state.courses].sort((a, b) => {
                const dateA = new Date(a.updatedAt);
                const dateB = new Date(b.updatedAt);
                return dateB - dateA;
            });

            state.filterUpdatedCourses = sorted;
        },
        deleteCourse:(state,action)=>{
            const newArray = state.courses.filter(course=>{
                return course._id !== action.payload
            })
            state.courses = newArray
            state.filterCourses = newArray
            
        }
    }

})

export const {
    getAllCourses,
    searchCourses,
    addCourse,
    sortCourses,
    sortUpdatedCourse,
    deleteCourse,
    updateCourse,
} = coursesSlice.actions

export default coursesSlice.reducer
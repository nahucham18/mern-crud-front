import {configureStore} from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice.js';
import categoryReducer from '../features/category/categorySlica.js';
import coursesReducer from '../features/courses/coursesSlice.js';

export const store = configureStore({
    reducer:{
        users: usersReducer,
        category: categoryReducer,
        courses: coursesReducer,
    }
})


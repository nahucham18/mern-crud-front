import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: "",
        filterUsers: "",
    },
    reducers: {
        getAllUsers: (state, action) => {
            state.users = action.payload
            state.filterUsers = action.payload
        },
        searchUsers: (state, action) => {
            if (!action.payload) {
                state.filterUsers = state.users
            } else {
                const newUsers = state.users.filter(user => {
                    return (user.first_name.toLowerCase().includes(action.payload)) || (user.last_name.toLowerCase().includes(action.payload))
                })
                state.filterUsers = newUsers;
            }

        }
    }
})

export const { 
    getAllUsers,
    searchUsers } = usersSlice.actions

export default usersSlice.reducer
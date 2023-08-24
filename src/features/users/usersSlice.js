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
        addNewUser:(state,action)=>{
            state.users = [...state.users,action.payload]
            state.filterUsers = state.users
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

        },
        updateUser:(state,action)=>{
            const update = action.payload
            const newArray = state.users.filter(user=>{
                return user._id !== update._id
            })
            state.users = [...newArray,update]
            state.filterUsers = [...newArray,update]
        },
        deleteUser:(state,action)=>{
            const newArray = state.users.filter(user=>{
                return user._id !== action.payload;
            })
            state.users = newArray
            state.filterUsers = newArray
        }
    }
})

export const { 
    getAllUsers,
    searchUsers,
    deleteUser,
    updateUser,
    addNewUser } = usersSlice.actions

export default usersSlice.reducer
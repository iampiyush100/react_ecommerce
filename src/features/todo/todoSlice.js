import { createSlice } from '@reduxjs/toolkit'

const initialState = []


export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.push({...action.payload, id: Date.now(), isCompleted: false})
        },
        getTodos: (state, action) => {
            return { ...state }
        },
        updateTodo: (state, action) => {

        },
        deleteTodo: (state, action) => {
            state = state.filter(todo => todo.id != action.payload)
            return state
        },
        toggleComplete: (state, action) => {
            console.log('Previous State:', JSON.parse(JSON.stringify(state)));
            const todoToUpdate = state.find((todo) => todo.id === action.payload);
            if (todoToUpdate) todoToUpdate.isCompleted = !todoToUpdate.isCompleted;
        }
    },
})


export const { addTodo, getTodos, updateTodo, deleteTodo, toggleComplete } = todosSlice.actions

export default todosSlice.reducer


import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import TodoList from "../domain/TodoList";
import type { RootState } from "../store";

interface TodoListsState {
  lists: TodoList[] | null;
}

const initialState: TodoListsState = {
  lists: null,
};

export const todoListsSlice = createSlice({
  name: "todoLists",
  initialState,
  reducers: {
    setTodoLists: (state, action: PayloadAction<TodoList[]>) => {
      state.lists = action.payload;
    },
    addTodoList: (state, action: PayloadAction<TodoList>) => {
      state.lists = state.lists?.concat(action.payload) ?? null;
    },
    removeTodoList: (state, action: PayloadAction<number>) => {
      state.lists =
        state.lists?.filter((ls) => ls.id !== action.payload) ?? null;
    },
    updateTodoList: (state, action: PayloadAction<TodoList>) => {
      state.lists =
        state.lists?.map((ls) =>
          ls.id === action.payload.id ? action.payload : ls
        ) ?? null;
    },
  },
});

export const { setTodoLists, addTodoList, removeTodoList, updateTodoList } =
  todoListsSlice.actions;

export const getLists = (state: RootState) => state.todoLists.lists;

export default todoListsSlice.reducer;

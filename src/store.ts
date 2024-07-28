import { configureStore } from "@reduxjs/toolkit";
import todoListsReducer from './slice/todoListsSlice';

const store = configureStore({
  reducer: {
    todoLists: todoListsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
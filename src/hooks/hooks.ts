import { useEffect } from "react";
import TodoList from "../domain/TodoList";
import config from "../env/env";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import {
  setTodoLists,
  addTodoList,
  removeTodoList,
  updateTodoList,
  getLists,
} from "../slice/todoListsSlice";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export function useLists(): {
  todoLists: TodoList[] | null,
  createList: (body: { name: string }) => Promise<TodoList>,
  deleteList: (id: number) => Promise<void>,
  updateList: (todolist: Partial<TodoList> & { id: number }) => Promise<TodoList>
} {
  const dispatch = useAppDispatch();
  const todoLists = useAppSelector(getLists);

  useEffect(() => {
    fetch(`${config.APIURL}/lists`)
      .then((r) =>
        r.ok
          ? r
          : Promise.reject("Invalid response from the server: " + r.status)
      )
      .then((r) => r.json())
      .then((lists) => dispatch(setTodoLists(lists)));
  }, [dispatch]);

  const createList: (body: { name: string }) => Promise<TodoList> = (body) => {
    return fetch(`${config.APIURL}/lists`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((r) =>
        r.ok
          ? r
          : Promise.reject("Invalid response from the server: " + r.status)
      )
      .then((r) => r.json())
      .then((list) => dispatch(addTodoList(list)).payload);
  };

  const deleteList: (id: number) => Promise<void> = (id) => {
    return fetch(`${config.APIURL}/lists/${id}`, {
      method: "DELETE",
    })
      .then((r) =>
        r.ok
          ? r
          : Promise.reject("Invalid response from the server: " + r.status)
      )
      .then(() => {
        dispatch(removeTodoList(id));
      });
  };

  const updateList: (
    todolist: Partial<TodoList> & { id: number }
  ) => Promise<TodoList> = (todoList) => {
    return fetch(`${config.APIURL}/lists/${todoList.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoList),
    })
      .then((r) =>
        r.ok
          ? r
          : Promise.reject("Invalid response from the server: " + r.status)
      )
      .then((r) => r.json())
      .then((updated) => dispatch(updateTodoList(updated)).payload);
  };

  return { todoLists, createList, deleteList, updateList };
}

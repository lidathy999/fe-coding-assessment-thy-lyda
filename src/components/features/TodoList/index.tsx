"use client";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";

import TextField from "@/components/ui/TextField";
import { DeleteIcon, EditIcon } from "@/Icons";
import { useLogic } from "./useLogic";

type TodoType = {
  id: number;
  title: string;
  completed: boolean;
};

const TodoList = () => {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [editTask, setEditTask] = useState<TodoType | null>(null);
  const { getData, createTodo, updateTodo, deleteTodo, handleChangeCheckBox } =
    useLogic({
      helper: { setTitle, setTodos, setEditTask },
      state: { title },
    });

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (editTask?.id) {
      updateTodo(editTask);
    } else {
      createTodo();
    }
  };

  const borderStyle = (todo: any) => {
    if (todo.completed) {
      return "line-through border-red-200";
    }
    return "!border-success-400";
  };

  return (
    <div className="flex flex-col min-h-full gap-4 w-full lg:w-1/2 lg:border border-gray-200 p-4">
      <div className="w-full text-lg font-bold text-center">Todo List</div>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-[auto_70px] gap-4">
          <TextField
            type="text"
            value={title}
            placeholder="Add a todo"
            onChange={(e: any) => setTitle(e.target.value)}
          />
          <button className="dark:!bg-gray-700 dark:text-foreground bg-gray-200 rounded-md">
            {editTask?.id ? "Update" : "Add"}
          </button>
        </div>
      </form>
      <div className="grid gap-4">
        {todos.map((todo: any) => (
          <div
            key={todo.id}
            className={`flex justify-between rounded-md p-3 border ${borderStyle(
              todo
            )}`}
          >
            <div className="flex gap-4">
              <input
                type="checkBox"
                checked={todo.completed}
                className=" w-4 h-auto"
                onChange={() => {
                  handleChangeCheckBox(todo);
                }}
              />
              {<div className="text-left"> {todo.title}</div>}
            </div>
            {!todo.completed && (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditTask(todo);
                    setTitle(todo.title);
                  }}
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => {
                    deleteTodo(todo);
                  }}
                >
                  <DeleteIcon />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default TodoList;

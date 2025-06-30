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
  const [editTitle, setEditTitle] = useState("");
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [editTask, setEditTask] = useState<TodoType | null>(null);

  const {
    getData,
    createTodo,
    updateTodo,
    deleteTodo,
    handleChangeCheckBox,
    handleOnBlur,
    handleOnKeyDown,
  } = useLogic({
    helper: { setTitle, setTodos, setEditTask, setEditTitle },
    state: { title, editTask, editTitle },
  });

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (editTask?.id) {
      updateTodo(editTask);
    } else {
      createTodo();
    }
  };

  const borderStyle = (todo: TodoType) => {
    if (todo.completed) {
      return "line-through border-green-400";
    }
    return "!border-success-400";
  };

  useEffect(() => {
    getData();
  }, []);

  const ActionButtons = ({ todo }: { todo: TodoType }) => {
    return (
      <div className="flex justify-end gap-2">
        {!todo.completed && (
          <button
            aria-label="edit"
            onClick={() => {
              setEditTask(todo);
              setEditTitle(todo.title);
            }}
          >
            <EditIcon />
          </button>
        )}
        <button
          aria-label="delete"
          onClick={() => {
            deleteTodo(todo);
          }}
        >
          <DeleteIcon />
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-full gap-4 w-full lg:w-1/2 lg:border border-gray-700 rounded-md p-4">
      <div className="w-full text-xl font-bold text-center">Todo List</div>
      <form onSubmit={onSubmit} id="create-todo-form">
        <div className="grid grid-cols-[auto_70px] gap-4">
          <TextField
            type="text"
            name="title"
            aria-label="title"
            value={title}
            placeholder="Add a todo"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <button
            disabled={title.length === 0}
            type="submit"
            aria-label="add"
            className="dark:!bg-gray-700 dark:text-foreground bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
          >
            Add
          </button>
        </div>
      </form>

      <div className="grid gap-4">
        {todos.toReversed().map((todo: TodoType) => (
          <div
            key={todo.id}
            className={`grid grid-cols-[auto_80px] gap-3 rounded-md p-3 border ${borderStyle(
              todo
            )}`}
          >
            <div className="flex items-center gap-4">
              <input
                type="checkBox"
                aria-label="checkbox"
                name="done"
                checked={todo.completed}
                disabled={todo.completed}
                className="min-w-4 h-4"
                onChange={() => {
                  handleChangeCheckBox(todo);
                }}
              />
              {(editTask?.id === todo.id) 
              ? (
                <TextField
                  type="text"
                  name="edit-title"
                  value={editTitle}
                  placeholder="Add a todo"
                  onBlur={handleOnBlur}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEditTitle(e.target.value);
                  }}
                  onKeyDown={handleOnKeyDown}
                  autoFocus
                />
              ) 
              : (
                <div
                  className={`text-left ${
                    !todo.completed ? "cursor-pointer" : ""
                  }`}
                  onClick={() => {
                    if (todo.completed) return;
                    setEditTask(todo);
                    setEditTitle(todo.title);
                  }}
                >
                  {todo.title}
                </div>
              )}
            </div>
            <ActionButtons key={todo.id} todo={todo} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default TodoList;

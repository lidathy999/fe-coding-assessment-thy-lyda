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

type TodoItemPropType = {
  todo: TodoType;
};

const TodoList = () => {
  const [title, setTitle] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [editTask, setEditTask] = useState<TodoType | null>(null);

  const { getData, createTodo, updateTodo, deleteTodo, handleChangeCheckBox } =
    useLogic({
      helper: { setTitle, setTodos, setEditTask, setEditTitle },
      state: { title },
    });

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
      return "line-through border-green-400";
    }
    return "!border-success-400";
  };

  useEffect(() => {
    getData();
  }, []);

  const TodoTitle = ({ todo }: TodoItemPropType) => {
    if (editTask?.id === todo.id) {
      return (
        <TextField
          type="text"
          value={editTitle}
          placeholder="Add a todo"
          onBlur={() => {
            setEditTask(null);
            if (editTask) updateTodo({ ...editTask, title: editTitle });
          }}
          onChange={(e: any) => {
            setEditTitle(e.target.value);
          }}
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              if (editTask) updateTodo({ ...editTask, title: editTitle });
            }
          }}
        />
      );
    }
    return (
      <div
        className={`text-left ${!todo.completed ? "cursor-pointer" : ""}`}
        onClick={() => {
          if (todo.completed) return;
          setEditTask(todo);
          setEditTitle(todo.title);
        }}
      >
        {todo.title}
      </div>
    );
  };

  const TodoItem = ({ todo }: TodoItemPropType) => {
    return (
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
          <TodoTitle key={todo.id} todo={todo} />
        </div>
        {!todo.completed && (
          <div className="flex justify-end gap-2">
            <button
              aria-label="edit"
              onClick={() => {
                setEditTask(todo);
                setEditTitle(todo.title);
              }}
            >
              <EditIcon />
            </button>
            <button
              aria-label="delete"
              onClick={() => {
                deleteTodo(todo);
              }}
            >
              <DeleteIcon />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-full gap-4 w-full lg:w-1/2 lg:border border-gray-700 rounded-md p-4">
      <div className="w-full text-xl font-bold text-center">Todo List</div>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-[auto_70px] gap-4">
          <TextField
            type="text"
            name="title"
            aria-label="title"
            value={title}
            placeholder="Add a todo"
            onChange={(e: any) => setTitle(e.target.value)}
          />
          <button
            type="submit"
            aria-label="add"
            className="dark:!bg-gray-700 dark:text-foreground bg-gray-200 rounded-md"
          >
            Add
          </button>
        </div>
      </form>
      <div className="grid gap-4">
        {todos.map((todo: any) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};
export default TodoList;

type TodoType = {
  id: number;
  title: string;
  completed: boolean;
};

type PropsType = {
  state: {
    title: string;
  };
  helper: {
    setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
    setEditTask: React.Dispatch<React.SetStateAction<TodoType | null>>;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
  };
};
export const useLogic = (props: PropsType) => {
  const { state, helper } = props;
  const getData = async () => {
    const response = await fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
    helper.setTodos(response);
  };

  const createTodo = () => {
    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: state.title }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        getData();
        helper.setTitle("");
      })
      .catch((err) => console.log(err));
  };

  const updateTodo = (todo: TodoType, type: string = "title") => {
    fetch("/api/todos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todo?.id,
        title: todo?.title,
        ...(type === "completed" ? { completed: true } : {}),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        getData();
        helper.setTitle("");
        helper.setEditTask(null);
      })
      .catch((err) => console.log(err));
  };

  const deleteTodo = (todo: TodoType) => {
    fetch("/api/todos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todo?.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        getData();
      })
      .catch((err) => console.log(err));
  };

  const handleChangeCheckBox = (todo: TodoType) => {
    updateTodo(todo, "completed");
  };

  return {
    handleChangeCheckBox,
    deleteTodo,
    updateTodo,
    createTodo,
    getData,
  };
};

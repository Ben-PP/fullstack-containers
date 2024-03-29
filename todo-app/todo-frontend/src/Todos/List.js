import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => {
    deleteTodo(todo);
  };

  const onClickComplete = (todo) => {
    completeTodo(todo);
  };

  return (
    <>
      {todos.map((todo) => {
        return (
          <div key={todo._id}>
            <hr />
            <Todo
              todo={todo}
              onClickComplete={onClickComplete}
              onClickDelete={onClickDelete}
            />
          </div>
        );
      })}
    </>
  );
};

export default TodoList;

import React from "react";
import { render, screen } from "@testing-library/react";
import Todo from "./Todo";

describe("Todo", () => {
  let todo;
  let onClickDelete;
  let onClickComplete;
  beforeEach(() => {
    jest.clearAllMocks();
    todo = {
      text: "Buy groceries",
      done: false,
    };

    onClickDelete = jest.fn();
    onClickComplete = jest.fn();
  });

  it("renders the todo text", () => {
    render(
      <Todo
        todo={todo}
        onClickDelete={onClickDelete}
        onClickComplete={onClickComplete}
      />
    );
    expect(screen.getByText(todo.text)).toBeInTheDocument();
  });

  it("renders a completed todo", () => {
    const completedTodo = {
      ...todo,
      done: true,
    };

    render(
      <Todo
        todo={completedTodo}
        onClickDelete={onClickDelete}
        onClickComplete={onClickComplete}
      />
    );
    expect(screen.getByText("This todo is done")).toBeInTheDocument();
  });

  it("renders an incomplete todo", () => {
    render(
      <Todo
        todo={todo}
        onClickDelete={onClickDelete}
        onClickComplete={onClickComplete}
      />
    );
    expect(screen.getByText("This todo is not done")).toBeInTheDocument();
  });
});

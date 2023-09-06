import { NewTodoResponse, NewUpdateTodoRequest } from "./types";

export const getTodos = async (): Promise<NewTodoResponse[]> => {
  const response = await fetch("/api/todo");

  if (!response.ok) {
    throw new Error("failed to fetch");
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data.todos;
};

export const getTodo = async (id: string): Promise<NewTodoResponse> => {
  const response = await fetch(`/api/todo/${id}`);

  if (!response.ok) {
    throw new Error("failed to fetch");
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data.todo;
};

export const createTodo = async (body: {
  title?: string;
  content: string;
}): Promise<NewTodoResponse> => {
  const response = await fetch(`/api/todo`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("failed to fetch");
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data.todo;
};

export const updateTodo = async (
  id: string,
  body: NewUpdateTodoRequest
): Promise<NewTodoResponse> => {
  const response = await fetch(`/api/todo/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data.todo;
};

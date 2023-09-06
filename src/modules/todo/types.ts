import { NextResponse } from "next/server";

export interface NewGetTodosRequest {
  isDone?: boolean;
}

export interface NewCreateTodoRequest {
  title?: string;
  content: string;
}

export interface NewUpdateTodoRequest {
  title?: string;
  content?: string;
  isDone?: boolean;
}

export interface NewTodoResponse {
  id: string;
  userId: string;
  title?: string;
  content: string;
}

export type NewGetTodosResponse = NextResponse<{
  todos?: NewTodoResponse[];
  error?: string;
}>;

export type NewCreateTodoResponse = NextResponse<{
  todo?: NewTodoResponse;
  error?: string;
}>;

export type NewGetTodoResponse = NextResponse<{
  todo?: NewTodoResponse;
  error?: string;
}>;

export type NewUpdateTodoResponse = NextResponse<{
  todo?: NewTodoResponse;
  error?: string;
}>;

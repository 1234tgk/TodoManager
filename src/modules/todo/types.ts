import { NextResponse } from "next/server";

export interface NewTodoRequest {
  title?: string;
  content: string;
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

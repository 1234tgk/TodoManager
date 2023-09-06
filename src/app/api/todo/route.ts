import startDb from "@/lib/mongodb";
import TodoModel from "@/modules/todo/model";
import { NextResponse, NextRequest } from "next/server";
import authorize from "@/lib/authorize";
import {
  NewCreateTodoRequest,
  NewGetTodosResponse,
  NewCreateTodoResponse,
} from "@/modules/todo/types";

export const GET = async (req: NextRequest): Promise<NewGetTodosResponse> => {
  const query = Object.fromEntries(req.nextUrl.searchParams);
  await startDb();

  const { error, status, userId } = await authorize();

  if (error) {
    return NextResponse.json({ error }, { status });
  }

  const todos = await TodoModel.find({ ...query, userId }).sort({
    updatedAt: -1,
  });

  return NextResponse.json({
    todos: todos.map((todo) => {
      return {
        id: todo._id.toString(),
        userId: todo.userId.toString(),
        title: todo.title,
        content: todo.content,
      };
    }),
  });
};

export const POST = async (req: Request): Promise<NewCreateTodoResponse> => {
  const body = (await req.json()) as NewCreateTodoRequest;

  await startDb();
  const { error, status, userId } = await authorize();

  if (error) {
    return NextResponse.json({ error }, { status });
  }

  const todo = await TodoModel.create({
    userId,
    ...body,
  });

  return NextResponse.json({
    todo: {
      id: todo._id.toString(),
      userId: todo.userId.toString(),
      title: todo.title,
      content: todo.content,
    },
  });
};

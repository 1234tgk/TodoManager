import startDb from "@/lib/mongodb";
import TodoModel from "@/modules/todo/model";
import { NextResponse } from "next/server";
import authorize from "@/lib/authorize";
import {
  NewUpdateTodoRequest,
  NewGetTodoResponse,
  NewUpdateTodoResponse,
} from "@/modules/todo/types";

export const GET = async (
  _: Request,
  { params }: { params: { id: string } }
): Promise<NewGetTodoResponse> => {
  await startDb();

  const { error, status, userId } = await authorize();

  if (error) {
    return NextResponse.json({ error }, { status });
  }

  const todo = await TodoModel.findById(params.id);

  if (!todo) {
    return NextResponse.json(
      { error: "Could not find the requested item" },
      { status: 404 }
    );
  }

  if (todo.userId.toString() !== userId?.toString()) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  return NextResponse.json({
    todo: {
      id: todo._id.toString(),
      userId: todo.userId.toString(),
      title: todo.title,
      content: todo.content,
    },
  });
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
): Promise<NewUpdateTodoResponse> => {
  const body = (await req.json()) as NewUpdateTodoRequest;
  await startDb();

  const { error, status, userId } = await authorize();

  if (error) {
    return NextResponse.json({ error }, { status });
  }

  const todo = await TodoModel.findById(params.id);

  if (!todo) {
    return NextResponse.json(
      { error: "Could not find the requested item" },
      { status: 404 }
    );
  }

  if (todo.userId.toString() !== userId?.toString()) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  todo.set(body);

  try {
    await todo.save();
    return NextResponse.json({
      todo: {
        id: todo._id.toString(),
        userId: todo.userId.toString(),
        title: todo.title,
        content: todo.content,
      },
    });
  } catch (e) {
    return NextResponse.json({ error: "Server Error!" }, { status: 500 });
  }
};

import startDb from "@/lib/mongodb";
import TodoModel from "@/modules/todo/model";
import { NextResponse } from "next/server";
import authorize from "@/lib/authorize";

interface NewTodoRequest {
  title?: string;
  content: string;
}

interface NewTodoRespose {
  id: string;
  userId: string;
  title?: string;
  content: string;
}

type NewGetResponse = NextResponse<{
  todos?: NewTodoRespose[];
  error?: string;
}>;
type NewPostResponse = NextResponse<{ todo?: NewTodoRespose; error?: string }>;

export const GET = async (): Promise<NewGetResponse> => {
  await startDb();

  const { error, status, userId } = await authorize();

  if (error) {
    return NextResponse.json({ error }, { status });
  }

  const todos = await TodoModel.find({ userId }).sort({ updatedAt: -1 });

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

export const POST = async (req: Request): Promise<NewPostResponse> => {
  const body = (await req.json()) as NewTodoRequest;

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

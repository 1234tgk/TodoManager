import startDb from "@/lib/mongodb";
import UserModel from "@/modules/user/model";
import { NextResponse } from "next/server";

interface NewUserRequest {
  name: string;
  email: string;
  password: string;
}

interface NewUserRespose {
  id: string;
  name: string;
  email: string;
}

type NewResponse = NextResponse<{ user?: NewUserRespose; error?: string }>;

export const POST = async (req: Request): Promise<NewResponse> => {
  const body = (await req.json()) as NewUserRequest;

  await startDb();

  const oldUser = await UserModel.findOne({ email: body.email });
  if (oldUser) {
    return NextResponse.json(
      { error: "email is already in use!" },
      { status: 422 }
    );
  }

  const user = await UserModel.create({ ...body });

  return NextResponse.json({
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.email,
      role: user.role,
    },
  });
};

import { getServerSession } from "next-auth";
import authOptions from "./authOptions";
import UserModel from "../modules/user/model";
import { ObjectId } from "mongoose";

export default async function authorize(): Promise<{
  error?: string;
  status?: number;
  userId?: ObjectId;
}> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { error: "User not signed in", status: 401 };
  }

  const sessionUser = session.user as { id: string };

  const user = await UserModel.findById(sessionUser.id);

  if (!user) {
    return {
      error: "User not recognized within the system",
      status: 404,
    };
  }

  return { userId: user._id };
}

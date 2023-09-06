import React from "react";
import { NewTodoResponse } from "@/modules/todo/types";
import Link from "next/link";

interface Props {
  todo: NewTodoResponse;
}

const Todo = ({ todo }: Props) => {
  return (
    <Link
      href={`/todo/${todo.id}`}
      className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 h-40 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105'
    >
      <h2 className='text-xl font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap max-w-xs'>
        {todo?.title || ""}
      </h2>
      <p className='text-gray-500 line-clamp-4 max-w-xs'>{todo.content}</p>
    </Link>
  );
};

export default Todo;

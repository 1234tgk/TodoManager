import React from "react";
import { Todo } from "@/types";
import Link from "next/link";

interface Props {
  todo: Todo;
}

const Todo = ({ todo }: Props) => {
  return (
    <Link
      href={`/todo/${todo.id}`}
      className='bg-white rounded-lg shadow-md p-4 mb-4 h-40 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105'
    >
      <h2 className='text-xl font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap max-w-xs'>
        {todo?.title || ""}
      </h2>
      <p className='text-gray-500 overflow-hidden overflow-ellipsis max-w-xs'>
        {todo.content}
      </p>
    </Link>
  );
};

export default Todo;

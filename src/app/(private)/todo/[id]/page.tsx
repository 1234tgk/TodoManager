"use client";

import React, { useEffect, useState } from "react";
import { getTodo } from "@/modules/todo/api";
import TodoForm from "@/components/forms/Todo";
import { NewTodoResponse } from "@/modules/todo/types";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faPencil } from "@fortawesome/free-solid-svg-icons";

interface Props {
  params: {
    id: string;
  };
}

export default function Todo({ params: { id } }: Props) {
  const [todo, setTodo] = useState<NewTodoResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    getTodo(id).then((todo) => {
      setTodo(todo);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-semibold mb-4'>To-do Details</h1>
        <div className='space-x-2'>
          <button
            onClick={() => router.back()}
            className='bg-white text-blue-500 py-2 px-4 rounded-lg hover:bg-slate-200'
          >
            <FontAwesomeIcon icon={faArrowCircleLeft} className='mr-2' />
            Back
          </button>
          <button
            onClick={() => router.push(`/todo/${id}/edit`)}
            className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600'
          >
            <FontAwesomeIcon icon={faPencil} className='mr-2' />
            Edit
          </button>
        </div>
      </div>
      <TodoForm disabled todo={todo} />
    </>
  );
}

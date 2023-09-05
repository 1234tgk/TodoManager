"use client";

import React, { useEffect, useState } from "react";
import TodoComponent from "@/components/Todo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { Todo } from "@/types";
import { getTodos } from "@/modules/todo/api";
import Spinner from "@/components/Spinner";

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    getTodos().then((todos) => {
      setTodos(todos);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-semibold'>To-Do List</h1>
        <button
          onClick={() => router.push("/todo/new")}
          className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600'
        >
          <FontAwesomeIcon icon={faPlus} className='mr-2' />
          Create
        </button>
      </div>
      {!todos || todos.length === 0 ? (
        <h1>No items</h1>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4'>
          {/* Render the list of to-dos in a grid */}
          {todos.map((todo) => (
            <TodoComponent key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </>
  );
}

"use client";

import { createTodo } from "@/modules/todo/api";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { Todo } from "@/types";
import TodoForm from "@/components/forms/Todo";

const DEFAULTS = {
  content: "",
};

export default function Todo() {
  const [formState, setFormState] = useState(DEFAULTS);
  const router = useRouter();

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    const { name, value } = target;

    setFormState((state) => {
      return { ...state, [name]: value };
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      await createTodo(formState);
      router.push("/todo");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-semibold mb-4'>Edit To-Do</h1>
        <div className='space-x-2'>
          <button
            onClick={() => router.back()}
            className='bg-white text-blue-500 py-2 px-4 rounded-lg hover:bg-slate-200'
          >
            <FontAwesomeIcon icon={faArrowCircleLeft} className='mr-2' />
            Back
          </button>
        </div>
      </div>
      <TodoForm onChange={handleChange} onSubmit={handleSubmit} />
    </>
  );
}

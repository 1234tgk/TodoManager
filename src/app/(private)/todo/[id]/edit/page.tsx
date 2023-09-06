"use client";

import { getTodo, updateTodo } from "@/modules/todo/api";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import TodoForm from "@/components/forms/Todo";
import Spinner from "@/components/Spinner";

interface Props {
  params: {
    id: string;
  };
}

const DEFAULTS = {
  content: "",
};

export default function Todo({ params: { id } }: Props) {
  const [formState, setFormState] = useState(DEFAULTS);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    getTodo(id).then((todo) => {
      setFormState(todo);
      setIsLoading(false);
    });
  }, [id]);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    const { name, value } = target;

    if (!formState) {
      setFormState;
    }

    setFormState((state) => {
      return { ...state, [name]: value };
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      await updateTodo(id, formState);
      router.push("/todo");
    } catch (e) {
      alert(e);
    }
  };

  const handleDone = async () => {
    try {
      await updateTodo(id, { isDone: true });
      router.push("/todo");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
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
          <button
            onClick={handleDone}
            className='bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600'
          >
            <FontAwesomeIcon icon={faCheckCircle} className='mr-2' />
            Done
          </button>
        </div>
      </div>
      <TodoForm
        onChange={handleChange}
        onSubmit={handleSubmit}
        todo={formState}
      />
    </>
  );
}

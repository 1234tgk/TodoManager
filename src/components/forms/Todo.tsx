import { Todo } from "@/types";
import React from "react";
import InputField from "../InputField";
import TextAreaField from "../TextAreaField";

interface Props {
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  todo?: Pick<Todo, "title" | "content">;
}

export default function TodoForm({
  disabled = false,
  onChange,
  onSubmit,
  todo,
}: Props) {
  return (
    <form onSubmit={onSubmit} className='bg-white p-4 rounded shadow-md'>
      <div className='mb-4'>
        <InputField
          label='title'
          type='text'
          id='title'
          name='title'
          placeholder='title'
          value={todo?.title}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      <div className='mb-4'>
        <TextAreaField
          label='content'
          id='content'
          name='content'
          placeholder='content'
          value={todo?.content}
          onChange={onChange}
          disabled={disabled}
          required
        />
      </div>
      {!disabled && (
        <button
          type='submit'
          className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'
          disabled={disabled}
        >
          Save
        </button>
      )}
    </form>
  );
}

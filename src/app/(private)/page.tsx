import React from "react";
import Todo from "@/components/Todo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const todos = [
  { id: "1", title: "Task 1", content: "content for Task 1" },
  {
    id: "2",
    title: "Task 2",
    content:
      "content for Task 2, a really long one! ahhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
  },
  {
    id: "3",
    title: "Task 3, a really long title! ahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
    content: "content for Task 3",
  },
  { id: "4", title: "Task 4", content: "content for Task 4" },
  { id: "5", title: "Task 5", content: "content for Task 5" },
  { id: "6", title: "Task 6", content: "content for Task 6" },
  { id: "7", title: "Task 7", content: "content for Task 7" },
  // Add more to-do items as needed
];

export default function Home() {
  return (
    <>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-semibold'>To-Do List</h1>
        <button className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600'>
          <FontAwesomeIcon icon={faPlus} className='mr-2' />
          Create
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4'>
        {/* Render the list of to-dos in a grid */}
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
    </>
  );
}

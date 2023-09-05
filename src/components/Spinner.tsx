import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Spinner() {
  return (
    <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-75'>
      <FontAwesomeIcon
        icon={faSpinner}
        spin
        className='text-blue-500 text-4xl'
      />
    </div>
  );
}

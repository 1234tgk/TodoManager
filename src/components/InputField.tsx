import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputField: React.FC<InputProps> = (props) => {
  const { label, ...inputProps } = props;
  return (
    <div className='mb-4'>
      <label className='block text-gray-600 dark:text-gray-200'>{label}</label>
      <input
        className='w-full p-2 border rounded-md bg-white dark:bg-gray-800'
        placeholder='Generic placeholder'
        {...inputProps}
      />
    </div>
  );
};

export default InputField;

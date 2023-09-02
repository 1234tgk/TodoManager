import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputField: React.FC<InputProps> = (props) => {
  const { label, ...inputProps } = props;
  return (
    <div className='mb-4'>
      <label className='block text-gray-600'>{label}</label>
      <input
        className='w-full p-2 border rounded-md'
        placeholder='Generic placeholder'
        {...inputProps}
      />
    </div>
  );
};

export default InputField;

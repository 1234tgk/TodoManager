"use client";

import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";

const DEFAULTS = {
  name: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const [formState, setFormState] = useState(DEFAULTS);
  const router = useRouter();

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;
    setFormState((state) => {
      return { ...state, [name]: value };
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify(formState),
    }).then((res) => res.json());

    if (res?.error) {
      return alert(res.error);
    }

    alert("Sign Up Success! Login again with your new credentials");
    router.replace("/auth/login");
  };

  return (
    <>
      <h2 className='text-2xl mb-4'>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          type='name'
          id='name'
          name='name'
          label='name'
          placeholder='Enter your name'
          value={formState.name}
          onChange={handleChange}
          required
        />
        <InputField
          type='email'
          id='email'
          name='email'
          label='email'
          placeholder='Enter your email'
          value={formState.email}
          onChange={handleChange}
          required
        />
        <InputField
          type='password'
          id='password'
          name='password'
          label='password'
          placeholder='Enter your password'
          value={formState.password}
          onChange={handleChange}
          required
        />
        <button
          type='submit'
          className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'
        >
          Sign Up
        </button>
      </form>
      <p className='mt-4 text-center'>
        Already have an account?{" "}
        <a href='/auth/login' className='text-blue-500'>
          Login
        </a>
      </p>
    </>
  );
};

export default SignUp;

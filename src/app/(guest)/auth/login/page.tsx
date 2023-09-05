"use client";

import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";

const DEFAULTS = {
  email: "",
  password: "",
};

const Login = () => {
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

    const res = await signIn("credentials", { ...formState, redirect: false });

    if (res?.error) return alert(res.error);
    router.replace("/todo");
  };

  return (
    <>
      <h2 className='text-2xl mb-4'>Login</h2>
      <form onSubmit={handleSubmit}>
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
          Login
        </button>
      </form>
      <p className='mt-4 text-center'>
        I am new.{" "}
        <a href='/auth/sign-up' className='text-blue-500'>
          Sign up
        </a>
      </p>
    </>
  );
};

export default Login;

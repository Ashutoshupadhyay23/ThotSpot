import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {register, handleSubmit, reset} = useForm()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async(data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if(session){
        const userData = await authService.getCurrentUser();

        if(useDispatch){
          dispatch(authLogin(userData));
          navigate('/');
        }
      }
    } catch (error) {
      setError(error.essage)
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setError('');
        reset();
      }, 5000);
    }

  }


  return (
    <div className='flex items-center justify-center w-full py-8'>
      <div className={`mx-auto w-full max-w-sm bg-gray-300 rounded-xl p-7 border border-black/10 ${isLoading ? 'blur' : ''}`}>

        <div className='mb-2 flex justify-center'>
          <span className='inline-block w-full max-w-[50px]'>
            <Logo width='100%' />
          </span>
        </div>

        <h2 className='text-center text-2xl font-bold leading-tight'>
          Sign in to your account
        </h2>

        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-blue-500 text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {error && <p className="text-red-600 mt-6 text-center">{error}</p>}

        <form onSubmit={handleSubmit(handleLogin)} className='mt-8'>
        {/* handleSubmit is a method of hook form where we can use our method  */}
          <div className='space-y-5'>

            <Input 
              label="Email:"
              placeholder='Email address'
              type='email'
              {...register('email', {
                required: true,
                validate: {
                  matchPatern: (value) => {
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address"
                  }
                }
              })}
            />

            <Input
              label="Password: "
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
              })}
            />

            <Button className='w-full' type='submit'>
              Log in
            </Button>

          </div>
        </form>

      </div>
    </div>
  )
};

export default Login;

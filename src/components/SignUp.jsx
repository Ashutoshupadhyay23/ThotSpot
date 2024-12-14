import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'


const SignUp = () => {

  const navigate = useNavigate()
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const {register, handleSubmit, reset, formState: {errors} } = useForm()
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async(data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);

      if(userData) {
        const userData = await authService.getCurrentUser();

        if(userData) {
          dispatch(login(userData));
          navigate('/');
        }
      }
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false)
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

        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create an account
        </h2>

        <p className="mt-2 mb-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-blue-500 text-primary transition-all duration-200 hover:underline"
          >
            Log In
          </Link>
        </p>

        {error && <p className="text-red-600 mt-4 text-center">
          {error}
        </p>}

        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className='space-y-5'>

            <Input
              label= 'Name:'
              placeholder='Enter your name'
              {...register('name', {
                required: true
              })}   
              
            />

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
              label= 'Password:'
              type='password'
              placeholder='Password'
              {...register('password', {
                required: true,
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters long"
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*\d).*$/,
                  message: "Password must include letters and numbers"
                }
              })}
            
            />

            {errors.password && <p className="text-red-500 text-xs pl-2">
              {errors.password.message}
            </p>}

            <Button 
              className='w-full' 
              type='submit' 
              disabled={isLoading}
            >
              Create Account
            </Button>

          </div>
        </form>

      </div>
    </div>
  )
};

export default SignUp;

import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../custom-hooks/useAuth';
import { BASE_API_URL } from '../../utils/constants';
import { EmailIcon, LoginLogo, PasswordIcon } from '../../utils/images';

const LoginPage = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const { updateLoginStatus } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setErrorMsg('');
      await axios.post(`${BASE_API_URL}/auth/login`, data);
      await updateLoginStatus();
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      setErrorMsg(
        error.response.data || 'Error during login. Try again later.'
      );
    }
  };

  return (
    <div className='flex flex-col justify-center items-center text-base leading-6 md:bg-neutral-50 text-zinc-800'>
      <img
        loading='lazy'
        src={LoginLogo}
        alt='Logo'
        className='mt-16 max-w-full aspect-[4.55] w-[182px] max-md:mt-10'
      />
      <div className='flex flex-col justify-center mt-12 max-w-full bg-white rounded-xl w-[476px] max-md:mt-10'>
        <div
          className='flex flex-col p-10 max-md:px-5 max-md:max-w-full'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='text-3xl font-bold'>Login</div>
          <div className='mt-2 text-neutral-500'>
            Add your details below to get back into the app
          </div>
          <form className='flex flex-col gap-4 mt-8'>
            {errorMsg && <p className='error-msg'>{errorMsg}</p>}
            <div>
              <label
                htmlFor='email'
                className={`mt-10 text-xs ${
                  errors.email ? 'text-red-500' : 'text-zinc-800'
                }`}
              >
                Email address
              </label>
              <div
                className={`flex gap-3 items-center px-4 py-3 mt-1 bg-white rounded-lg border ${
                  errors.email && 'border-red-500'
                } border-solid`}
              >
                <img
                  src={EmailIcon}
                  alt=''
                  className='shrink-0 self-stretch my-auto w-4 aspect-square'
                />
                <input
                  type='text'
                  id='email'
                  placeholder='rubel2585@gmail.com'
                  className='flex-auto self-stretch text-base text-zinc-800 focus:outline-none'
                  {...register('email', {
                    required: "Can't be empty",
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/g,
                      message: 'Invalid email address',
                    },
                  })}
                />
                {errors.email && (
                  <span className='flex-auto self-stretch my-auto text-xs text-right text-red-500'>
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor='password'
                className={`mt-10 text-xs ${
                  errors.password ? 'text-red-500' : 'text-zinc-800'
                }`}
              >
                Create password
              </label>
              <div
                className={`flex gap-3 items-center px-4 py-3 mt-1 bg-white rounded-lg border ${
                  errors.password && 'border-red-500'
                } border-solid`}
              >
                <img
                  src={PasswordIcon}
                  alt=''
                  className='shrink-0 self-stretch my-auto w-4 aspect-square'
                />
                <input
                  type='password'
                  id='password'
                  placeholder='Enter your password'
                  className='flex-auto self-stretch text-base text-zinc-800 focus:outline-none'
                  {...register('password', {
                    required: 'Please check again',
                    minLength: {
                      value: 8,
                      message: 'Must have at least 8 characters',
                    },
                  })}
                />
                {errors.password && (
                  <span className='flex-auto self-stretch my-auto text-xs text-right text-red-500'>
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <button
              type='submit'
              className='justify-center text-center items-center px-16 py-4 mt-3 font-semibold text-white whitespace-nowrap bg-purple rounded-lg max-md:px-5'
            >
              Login
            </button>
          </form>
          <div className='mt-6 text-center max-sm:flex max-sm:flex-col'>
            <span className='text-neutral-500'>Don&apos;t have an account? </span>
            <span className='text-purple'>
              <Link to='/register'>Create account</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_API_URL } from '../../utils/constants';
import { EmailIcon, LoginLogo, PasswordIcon } from '../../utils/images';

const RegisterPage = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setErrorMsg('');
      setSuccessMsg('');
      await axios.post(`${BASE_API_URL}/auth/register`, {
        email: data.email,
        password: data.password,
      });
      reset();
      setSuccessMsg('Registration successful.');
      setTimeout(() => {
        setSuccessMsg('');
        navigate('/');
      }, 2000);
    } catch (error) {
      console.log(error);
      setErrorMsg(
        error.response.data || 'Error while registering user. Try again later.'
      );
    }
  };

  return (
    <div className='flex flex-col justify-center items-center p-20 md:bg-neutral-50 leading-[150%] max-md:px-5'>
      <img
        src={LoginLogo}
        alt='Company logo'
        className='mt-4 max-w-full aspect-[4.55] w-[182px]'
      />
      <div className='flex flex-col justify-center mt-12 max-w-full bg-white rounded-xl w-[476px] max-md:mt-10'>
        <div className='flex flex-col md:p-10'>
          <h1 className='text-3xl font-bold text-zinc-800'>Create account</h1>
          <p className='mt-2 text-base text-neutral-500'>
            Let's get you started sharing your links!
          </p>
          <form
            className='flex flex-col gap-4 mt-8'
            onSubmit={handleSubmit(onSubmit)}
          >
            {errorMsg && <p className='error-msg'>{errorMsg}</p>}
            {successMsg && <p className='text-green-500'>{successMsg}</p>}
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
                  placeholder='e.g. alex@email.com'
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
                  placeholder='At least 8 characters'
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
            <div>
              <label
                htmlFor='cpassword'
                className={`mt-10 text-xs ${
                  errors.cpassword ? 'text-red-500' : 'text-zinc-800'
                }`}
              >
                Confirm password
              </label>
              <div
                className={`flex gap-3 items-center px-4 py-3 mt-1 bg-white rounded-lg border ${
                  errors.cpassword && 'border-red-500'
                } border-solid`}
              >
                <img
                  src={PasswordIcon}
                  alt=''
                  className='shrink-0 self-stretch my-auto w-4 aspect-square'
                />
                <input
                  type='password'
                  id='cpassword'
                  placeholder='At least 8 characters'
                  className='flex-auto self-stretch text-base text-zinc-800 focus:outline-none'
                  {...register('cpassword', {
                    required: 'Please check again',
                    validate: (value) => {
                      if (value !== watch('password')) {
                        return 'Passwords do not match';
                      }
                    },
                  })}
                />
                {errors.cpassword && (
                  <span className='flex-auto self-stretch my-auto text-xs text-right text-red-500'>
                    {errors.cpassword.message}
                  </span>
                )}
              </div>
            </div>
            <p className='mt-2 text-xs text-neutral-500'>
              Password must contain at least 8 characters
            </p>
            <button
              type='submit'
              className='justify-center items-center px-16 py-4 mt-2 text-base font-semibold text-white bg-purple rounded-lg max-md:px-5'
            >
              Create new account
            </button>
          </form>
          <p className='mt-6 text-base text-center max-sm:flex max-sm:flex-col'>
            <span className='text-neutral-500'>Already have an account? </span>
            <Link to='/' className=' text-purple'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;

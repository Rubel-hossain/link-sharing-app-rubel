import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../custom-hooks/useAuth';

const Footer = ({ handleSubmit }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isRequestSent: profileRequestSent } = useSelector(
    (state) => state.profile
  );
  const { isRequestSent: linksRequestSent } = useSelector(
    (state) => state.links
  );
  const { updateLoginStatus } = useAuth();

  const handleLogout = () => {
    updateLoginStatus();
    navigate('/');
  };

  const isRequestSent = profileRequestSent || linksRequestSent;

  return (
    <div className='ml-auto'>
      <Link
        to='/'
        onClick={handleLogout}
        className='mr-6 tracking-wider font-semibold hover:underline'
      >
        Logout
      </Link>
      <button
        type='submit'
        form='profile-form'
        disabled={isRequestSent}
        className={`cursor-pointer justify-center self-end px-7 py-4 mt-6 mr-10 text-base font-semibold leading-6 text-white whitespace-nowrap  rounded-lg max-md:px-5 max-md:mr-2.5 border bg-purple ${
          isRequestSent && 'opacity-25 cursor-not-allowed'
        }`}
        onClick={() => pathname !== '/profile' && handleSubmit()} // call save links function for dashboard page
      >
        {isRequestSent ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
};

export default Footer;

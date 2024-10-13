import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LinkImage from '../../svgs/LinkImage';
import ProfileDetailsImage from '../../svgs/ProfileDetailsImage';
import { GREY_COLOR, PURPLE_COLOR } from '../../utils/constants';
import { EyePreviewIcon, LoginLogo, SmallLoginLogo } from '../../utils/images';

const Header = ({ activeIndex, updateActiveIndex }) => {
  const navigate = useNavigate();

  return (
    <header className='flex flex-col justify-center self-center px-5 py-4 w-full text-base font-semibold leading-6 bg-white rounded-xl max-w-[1392px] max-md:max-w-full'>
      <div className='flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full items-center'>
        <Link to='/'>
          <img
            loading='lazy'
            src={LoginLogo}
            alt='Logo'
            className='hidden md:block shrink-0 my-auto max-w-full aspect-[4.55] w-[146px]'
          />
          <img
            loading='lazy'
            src={SmallLoginLogo}
            alt='Logo'
            className='max-md:block md:hidden shrink-0 my-auto aspect-[4.55]'
          />
        </Link>
        <nav className='flex gap-4 items-center cursor-pointer'>
          <div
            className={`flex items-center gap-2 px-7 py-3 rounded-lg text-neutral-500 max-md:px-5 ${
              activeIndex === 0 && 'bg-neutral-100 text-purple font-semibold'
            }`}
            onClick={() => {
              updateActiveIndex(0);
              navigate('/dashboard');
            }}
          >
            {activeIndex === 0 ? (
              <LinkImage fill={PURPLE_COLOR} />
            ) : (
              <LinkImage fill={GREY_COLOR} />
            )}
            <div className='hidden md:flex flex-auto font-semibold'>Links</div>
          </div>
          <div
            className={`flex gap-2 items-center px-7 py-3 rounded-lg text-neutral-500 max-md:px-5 ${
              activeIndex === 1 && 'bg-neutral-100 text-purple font-semibold'
            }`}
            onClick={() => {
              updateActiveIndex(1);
              navigate('/profile');
            }}
          >
            {activeIndex === 1 ? (
              <ProfileDetailsImage fill={PURPLE_COLOR} />
            ) : (
              <ProfileDetailsImage fill={GREY_COLOR} />
            )}
            <div className='hidden md:flex flex-auto font-semibold'>
              Profile Details
            </div>
          </div>
        </nav>
        <Link
          className='hidden md:flex justify-center px-7 py-4 text-purple whitespace-nowrap rounded-lg border border-purple border-solid max-md:px-5 hover:bg-purple-light'
          to='/preview'
        >
          Preview
        </Link>
        <Link
          className='max-md:block md:hidden justify-center px-7 py-4 text-purple whitespace-nowrap rounded-lg border border-purple border-solid max-md:px-5'
          to='/preview'
        >
          <img src={EyePreviewIcon} alt='Preview' />
        </Link>
      </div>
    </header>
  );
};

export default Header;

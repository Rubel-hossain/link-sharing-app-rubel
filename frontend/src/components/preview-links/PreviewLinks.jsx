import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useLocation } from 'react-router-dom';
import useData from '../../custom-hooks/useData';
import { previewItems, previewLinkColors } from '../../utils/constants';
import { ArrowRightIcon } from '../../utils/images';

const PreviewLinks = ({ profileInfo, links }) => {
  const { pathname } = useLocation();
  const { profileImage, profileData } = useData();

  const isPreviewPage = pathname === '/profile' || pathname === '/dashboard';
  const hasNoImage = !profileImage && !profileInfo?.profileImage;
  const hasNoName = !profileInfo?.first_name && !profileInfo?.last_name;
  const hasNoEmail = !profileInfo?.email;

  return (
    <div
      className={`flex flex-col items-center ${
        !isPreviewPage ? 'w-[100%]' : 'w-[90%]'
      }`}
    >
      {hasNoImage ? (
        <>
          <Skeleton
            circle
            height='100px'
            width='100px'
            containerClassName='avatar-skeleton'
          />
        </>
      ) : (
        <img
          src={profileImage || profileInfo?.profileImage}
          alt='Profile Pic'
          className='w-[100px] h-[100px] rounded-full ml-auto mr-auto border-[5px] border-blue-600 mt-2 object-cover'
        />
      )}
      <h2
        className={`text-black mt-4 mb-2 text-[20px] text-center font-bold  w-[100%]`}
      >
        {hasNoName ? (
          <Skeleton width='150px' height='20px' />
        ) : (
          <>
            {profileData ? (
              <>
                {profileData?.first_name} {profileData?.last_name}
              </>
            ) : (
              <>
                {profileInfo?.first_name} {profileInfo?.last_name}
              </>
            )}
          </>
        )}
      </h2>
      <h5 className='text-neutral-500 text-center'>
        {hasNoEmail ? (
          <Skeleton width='100px' height='10px' />
        ) : (
          <>
            {profileData ? (
              <>{profileData?.email}</>
            ) : (
              <>
                <>{profileInfo?.email}</>
              </>
            )}
          </>
        )}
      </h5>
      <ul className='list-none m-0 p-0 w-[100%] h-[300px] flex flex-col items-center gap-5 mt-12 overflow-auto'>
        {links?.length === 0 ? (
          <>
            <div className={`${isPreviewPage ? 'w-[90%]' : 'w-[100%]'}`}>
              <Skeleton width='100%' height='40px' />
            </div>
            <div className={`${isPreviewPage ? 'w-[90%]' : 'w-[100%]'}`}>
              <Skeleton width='100%' height='40px' />
            </div>
            <div className={`${isPreviewPage ? 'w-[90%]' : 'w-[100%]'}`}>
              <Skeleton width='100%' height='40px' />
            </div>
            <div className={`${isPreviewPage ? 'w-[90%]' : 'w-[100%]'}`}>
              <Skeleton width='100%' height='40px' />
            </div>
          </>
        ) : (
          <>
            {links?.map(({ platform, link, _id }) => (
              <li
                className={`${isPreviewPage ? 'w-[90%]' : 'w-[100%]'}`}
                key={_id}
              >
                <a
                  href={link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`preview-link-item p-4 ${
                    previewLinkColors[platform.toLowerCase()]
                  }`}
                >
                  {previewItems[platform.toLowerCase()]}
                  <div className='text-sm'>{platform}</div>
                  <img src={ArrowRightIcon} alt='' className='ml-auto' />
                </a>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default PreviewLinks;

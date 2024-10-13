import React from 'react';
import { SavedIcon } from '../../utils/images';

const SuccessToast = ({ success }) => {
  return (
    <>
      {success && (
        <div className='flex gap-2 items-center px-6 py-4 rounded-xl shadow-lg bg-zinc-800 text-neutral-50 max-md:px-5 h-max'>
          <img
            src={SavedIcon}
            alt='Success icon'
            className='shrink-0 my-auto w-5 aspect-square'
          />
          <p className='flex-auto'>
            Your changes have been successfully saved!
          </p>
        </div>
      )}
    </>
  );
};

export default SuccessToast;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLinks } from '../../redux/features/linksSlice';
import { getProfileInfo } from '../../redux/features/profileSlice';
import PhoneInnerImage from '../../svgs/PhoneInnerImage';
import PreviewLinks from '../preview-links/PreviewLinks';

const PreviewScreen = () => {
  const { links } = useSelector((state) => state.links);
  const { profileInfo } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileInfo());
    dispatch(getLinks());
  }, [dispatch]);

  return (
    <section className='hidden xl:flex flex-col w-[41%] max-md:ml-0'>
      <div className='flex relative grow justify-center items-center self-stretch px-16 py-20 w-full bg-white rounded-xl max-md:px-5 max-md:mt-6 max-md:max-w-full'>
        <div className='flex relative flex-col justify-center mt-6 max-w-full aspect-[0.49] w-[307px] border-[1px] border-neutral-500 rounded-[40px] p-2'>
          <div className='absolute -z-1'>
            <PhoneInnerImage />
          </div>
          <div className='absolute z-0 inset-0 flex items-center justify-center'>
            <PreviewLinks profileInfo={profileInfo} links={links} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewScreen;

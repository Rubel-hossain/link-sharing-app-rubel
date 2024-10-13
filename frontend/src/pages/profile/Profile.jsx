/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import PreviewScreen from '../../components/preview-screen/PreviewScreen';
import SuccessToast from '../../components/success-toast/SuccessToast';
import useData from '../../custom-hooks/useData';
import {
  getProfileInfo,
  updateProfileInfo,
} from '../../redux/features/profileSlice';
import UploadImage from '../../svgs/UploadImage';
import { validImageCheck } from '../../utils/functions';
import { DefaultUploadImage } from '../../utils/images';

const ProfileDetailsHeader = () => {
  return (
    <header>
      <h1 className='text-3xl font-bold leading-10 text-zinc-800 max-md:max-w-full'>
        Profile Details
      </h1>
      <p className='mt-2 text-base leading-6 text-neutral-500 max-md:max-w-full'>
        Add your details to create a personal touch to your profile.
      </p>
    </header>
  );
};

const ProfileFieldsSection = ({ profileInfo, profileImage }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { updateProfileData } = useData();
  const { errorMsg } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (profileInfo?._id) {
      reset({
        first_name: profileInfo?.first_name || '',
        last_name: profileInfo?.last_name || '',
        email: profileInfo?.email || '',
      });
    }
  }, [profileInfo?._id, profileInfo?.email, profileInfo?.first_name, profileInfo?.last_name, reset]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      ...(profileImage && { profileImage }), // add image only if it's selected
    };
    dispatch(updateProfileInfo(payload));
    updateProfileData(payload);
  };

  return (
    <form
      id='profile-form'
      className='flex flex-col justify-center p-5 mt-6 mb-3 text-base leading-6 rounded-xl bg-neutral-50 max-md:max-w-full'
      onSubmit={handleSubmit(onSubmit)}
    >
      {errorMsg && <p className='error-msg'>{errorMsg}</p>}
      <div className='flex gap-4 mt-3 max-md:flex-wrap items-center'>
        <div className='grow w-[40%] text-neutral-500'>First name*</div>
        <div
          className={`profile-input flex gap-3 items-center px-4 py-3 mt-1 bg-white rounded-lg border ${
            errors.first_name && 'border-red-500'
          } border-solid`}
        >
          <input
            type='text'
            placeholder='rubel'
            className='profile-input'
            {...register('first_name', {
              required: "Can't be empty",
            })}
          />
          <span className='flex-auto self-stretch my-auto text-xs text-right text-red-500'>
            {errors.first_name?.message}
          </span>
        </div>
      </div>
      <div className='flex gap-4 mt-3 max-md:flex-wrap items-center'>
        <div className='grow w-[40%] text-neutral-500'>Last name*</div>
        <div
          className={`profile-input flex gap-3 items-center px-4 py-3 mt-1 bg-white rounded-lg border ${
            errors.last_name && 'border-red-500'
          } border-solid`}
        >
          <input
            type='text'
            placeholder='hossain'
            className='profile-input'
            {...register('last_name', {
              required: "Can't be empty",
            })}
          />
          <span className='flex-auto self-stretch my-auto text-xs text-right text-red-500'>
            {errors.last_name?.message}
          </span>
        </div>
      </div>
      <div className='flex gap-4 mt-3 max-md:flex-wrap  items-center'>
        <div className='grow w-[40%] text-neutral-500'>Email*</div>
        <div
          className={`profile-input flex gap-3 items-center px-4 py-3 mt-1 bg-white rounded-lg border ${
            errors.email && 'border-red-500'
          } border-solid`}
        >
          <input
            type='email'
            placeholder='e.g. email@example.com'
            className='profile-input'
            {...register('email', {
              required: "Can't be empty",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/g,
                message: 'Invalid email address',
              },
            })}
          />
          <span className='flex-auto self-stretch my-auto text-xs text-right text-red-500'>
            {errors.email?.message}
          </span>
        </div>
      </div>
    </form>
  );
};

const ProfileDetailsFooter = () => {
  const { success } = useSelector((state) => state.profile);

  return (
    <footer className='flex gap-5 justify-between mt-6 w-full text-base font-semibold leading-6 max-md:flex-wrap max-md:pr-5 max-md:max-w-full border-t border-t-gray-300'>
      <SuccessToast success={success} />
      <hr className='shrink-0 h-px' />
      <Footer />
    </footer>
  );
};

const SelectedProfileImage = ({ isLoading, selectedImage, profileImage }) => {
  return (
    <>
      {isLoading ? (
        <Skeleton width='193px' height='193px' className='mt-3' />
      ) : (
        <>
          <img
            src={selectedImage || profileImage}
            alt='User profile'
            className='shrink-0 max-w-full rounded-xl  w-[193px] h-[193px] max-md:mt-6 object-cover transition duration-300 ease-in-out opacity-100 group-hover:opacity-60'
          />
          <div className='absolute inset-0 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-col bg-gradient-to-b from-black to-transparent max-sm:w-[193px] max-sm:h-[193px]'>
            <UploadImage />
            <span className='text-white text-lg font-bold'>Change Image</span>
          </div>
        </>
      )}
    </>
  );
};

const Profile = () => {
  const fileRef = useRef();
  const { profileInfo, isLoading } = useSelector((state) => state.profile);
  const [activeIndex, setActiveIndex] = useState(1);
  const [profileImage, setProfileImage] = useState(null);
  const { updateProfileImage } = useData();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileInfo());
    return () => {
      setProfileImage(null);
      updateProfileImage(null);
    };
  }, [dispatch, updateProfileImage]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      const message = await validImageCheck(file);
      if (message === '') {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const result = reader.result;
          setProfileImage(result);
          updateProfileImage(result);
        };
      } else {
        alert(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateActiveIndex = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className='flex flex-col pt-6 bg-neutral-50'>
      <Header activeIndex={activeIndex} updateActiveIndex={updateActiveIndex} />
      <main className='px-6 pb-6 mt-6 w-full max-md:px-5 max-md:max-w-full'>
        <div className='flex gap-5 max-md:flex-col max-md:gap-0'>
          <PreviewScreen />
          <section className='flex flex-col ml-5 w-[100%] xl:w-[59%]'>
            <div className='flex flex-col grow items-start self-stretch pb-4 w-full bg-white rounded-xl max-md:mt-6 max-md:max-w-full'>
              <div className='flex flex-col self-stretch px-10 pt-10 pb-20 max-md:px-5 max-md:max-w-full'>
                <ProfileDetailsHeader />
                <section className='flex flex-col justify-center p-5 mt-10 rounded-xl bg-neutral-50 max-md:max-w-full'>
                  <div className='max-md:max-w-full'>
                    <div className='flex gap-5 max-md:flex-col max-md:gap-0'>
                      <div className='flex flex-col w-[36%]'>
                        <p className='self-stretch my-auto text-base leading-6 text-neutral-500'>
                          Profile picture
                        </p>
                      </div>
                      <div className='flex flex-col ml-5 w-[64%] max-md:ml-0 max-md:w-full'>
                        <div className='grow max-md:mt-4 max-md:max-w-full my-0 lg:w-[100%]'>
                          <div className='flex gap-5 max-md:flex-col max-md:gap-0'>
                            <div
                              className='flex flex-col w-6/12 max-md:ml-0 max-md:w-full'
                              onClick={() => fileRef.current.click()}
                            >
                              <div className='relative group cursor-pointer'>
                                {isLoading ||
                                profileImage ||
                                profileInfo?.profileImage ? (
                                  <SelectedProfileImage
                                    isLoading={isLoading}
                                    selectedImage={profileImage}
                                    profileImage={profileInfo?.profileImage}
                                  />
                                ) : (
                                  <div className='flex flex-col justify-center items-center px-5 text-base font-semibold leading-6 text-purple bg-violet-100 rounded-xl h-[193px] w-[193px]'>
                                    <img
                                      src={profileImage || DefaultUploadImage}
                                      alt='User Profile'
                                      className='self-center w-10 aspect-square'
                                    />
                                    <div className='mt-2'>+ Upload Image</div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className='flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full'>
                              <p className='self-stretch my-auto text-xs leading-5 text-neutral-500 max-md:mt-10'>
                                {profileImage
                                  ? 'Image Uploaded'
                                  : 'Image must be below 1024x1024px. Use PNG or JPG format.'}
                              </p>
                            </div>
                            <input
                              type='file'
                              accept='image/png,image/jpeg,image/jpg'
                              className='hidden'
                              ref={fileRef}
                              onChange={handleFileChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <ProfileFieldsSection
                  profileInfo={profileInfo}
                  profileImage={profileImage}
                />
              </div>
              <div className='shrink-0 h-px bg-zinc-300 max-md:max-w-full' />
              <ProfileDetailsFooter />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Profile;

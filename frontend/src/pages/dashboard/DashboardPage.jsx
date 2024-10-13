import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import LinksList from '../../components/links-list/LinksList';
import PreviewScreen from '../../components/preview-screen/PreviewScreen';
import SuccessToast from '../../components/success-toast/SuccessToast';
import {
  addNewLink,
  getLinks,
  updateLinks,
} from '../../redux/features/linksSlice';
import { GetStartedImage } from '../../utils/images';

const EmptyState = () => (
  <div className='flex flex-col justify-center px-5 py-16 mt-6 text-center rounded-xl bg-neutral-50 max-md:max-w-full'>
    <div className='flex flex-col justify-center items-center px-20 max-md:px-5 max-md:max-w-full'>
      <img
        loading='lazy'
        src={GetStartedImage}
        alt='Empty state illustration'
        className='max-w-full aspect-[1.56] w-[250px]'
      />
      <h2 className='mt-10 text-3xl font-bold leading-10 text-zinc-800 max-md:max-w-full'>
        Let&apos;s get you started
      </h2>
      <p className='mt-6 text-base leading-6 text-neutral-500 max-md:max-w-full'>
        Use the &quot;Add new link&quot; button to get started. Once you have more than
        one link, you can reorder and edit them. We&apos;re here to help you share
        your profiles with everyone!
      </p>
    </div>
  </div>
);

function DashboardPage() {
  const { isLoading, errorMsg, links, success } = useSelector(
    (state) => state.links
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLinks());
  }, [dispatch]);

  const handleSubmit = () => {
    dispatch(updateLinks(links));
  };

  const handleAddNewLink = () => {
    dispatch(addNewLink());
  };

  const updateActiveIndex = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className='flex flex-col pt-6 bg-neutral-50'>
      <Header activeIndex={activeIndex} updateActiveIndex={updateActiveIndex} />
      <main className='px-6 pb-6 mt-6 w-full max-md:px-5 max-md:max-w-full'>
        <div className='flex gap-5'>
          <PreviewScreen />
          <section className='flex flex-col ml-5 flex-1 w-[100%] lg:w-[59%] max-md:ml-0 max-md:w-full'>
            <div className='flex flex-col grow self-stretch pb-6 w-full bg-white rounded-xl max-md:mt-6 max-md:max-w-full'>
              <div className='flex flex-col p-10 max-md:px-5 max-md:max-w-full'>
                <h1 className='text-3xl font-bold leading-10 text-zinc-800 max-md:max-w-full'>
                  Customize your links
                </h1>
                <p className='mt-2 text-base leading-6 text-neutral-500 max-md:max-w-full'>
                  Add/edit/remove links below and then share all your profiles
                  with the world!
                </p>
                <button
                  className='justify-center items-center px-16 py-4 mt-10 text-base font-semibold leading-6 text-purple rounded-lg border border-purple border-solid max-md:px-5 max-md:max-w-full active-focus cursor-pointer hover:bg-purple-light'
                  onClick={handleAddNewLink}
                >
                  + Add new link
                </button>
                {errorMsg && <p className='error-msg'>{errorMsg}</p>}
                {isLoading && <p className='loading'>Loading...</p>}
                {links.length > 0 ? (
                  <LinksList links={links} />
                ) : (
                  <EmptyState />
                )}
              </div>
              <footer className='flex gap-5 justify-between mt-6 w-full text-base font-semibold leading-6 max-md:flex-wrap max-md:pr-5 max-md:max-w-full border-t border-t-gray-300'>
                <SuccessToast success={success} />
                <hr className='shrink-0 h-px bg-zinc-300 max-md:max-w-full' />
                <Footer handleSubmit={handleSubmit} />
              </footer>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;

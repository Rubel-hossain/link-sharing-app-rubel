import { useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PreviewLinks from '../../components/preview-links/PreviewLinks';
import { getLinks } from '../../redux/features/linksSlice';
import { getProfileInfo } from '../../redux/features/profileSlice';

function ProfilePreview() {
  const { links, errorMsg } = useSelector((state) => state.links);
  const { profileInfo } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const email = profileInfo?.email;

  useEffect(() => {
    dispatch(getLinks());
    dispatch(getProfileInfo());
  }, [dispatch]);

  return (
    <div className='flex flex-col leading-[150%] relative'>
      <div className='flex flex-col px-6 pt-6 pb-32 w-full text-base font-semibold md:bg-purple rounded-bl-[40px] rounded-br-[40px] max-md:px-5 max-md:max-w-full'>
        <div className='flex flex-col justify-center md:px-6 py-4 max-md:mb-32 md:mb-44 md:bg-white sm:bg-none rounded-xl md:pl-5 max-md:max-w-full'>
          <div className='flex gap-5 justify-between items-center max-md:flex-wrap max-md:max-w-full'>
            <Link
              className='justify-center px-7 py-4 text-purple rounded-lg border border-purple border-solid max-md:px-5 hover:bg-purple-light'
              to='/dashboard'
            >
              Back to Editor
            </Link>
            <div className='justify-center px-7 py-4 text-white bg-purple rounded-lg max-md:px-5'>
              <CopyToClipboard
                text={`${window.location.origin}/${email?.slice(
                  0,
                  email.indexOf('@')
                )}`}
                onCopy={() => toast('Link copied to clipboard')}
              >
                <button>Share Link</button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
      <div className='flex z-10 flex-col self-center px-14 py-8 mt-0 max-w-full md:bg-white md:rounded-3xl md:shadow-lg w-[375px] h-[600px] max-md:px-5 relative -top-40'>
        {errorMsg && <p className='error-msg'>{errorMsg}</p>}
        <PreviewLinks profileInfo={profileInfo} links={links} />
      </div>
    </div>
  );
}

export default ProfilePreview;

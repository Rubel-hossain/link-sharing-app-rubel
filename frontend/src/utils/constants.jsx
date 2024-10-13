import FacebookImage from '../svgs/FacebookImage';
import GitHubImage from '../svgs/GitHubImage';
import LinkedInImage from '../svgs/LinkedInImage';
import TwitterImage from '../svgs/TwitterImage';
import YoutubeImage from '../svgs/YoutubeImage';

export const BASE_API_URL = '/api';
export const GREY_COLOR = '#737373';
export const PURPLE_COLOR = '#633CFF';

export const options = [
  {
    value: 'GitHub',
    label: (
      <div className='dropdown-item'>
        <GitHubImage fill='#000' /> GitHub
      </div>
    ),
  },
  {
    value: 'LinkedIn',
    label: (
      <div className='dropdown-item'>
        <LinkedInImage fill='#000' /> LinkedIn
      </div>
    ),
  },
  {
    value: 'YouTube',
    label: (
      <div className='dropdown-item'>
        <YoutubeImage fill='#000' /> Youtube
      </div>
    ),
  },
  {
    value: 'Twitter',
    label: (
      <div className='dropdown-item'>
        <TwitterImage fill='#000' /> Twitter
      </div>
    ),
  },
  {
    value: 'Facebook',
    label: (
      <div className='dropdown-item'>
        <FacebookImage fill='#000' /> Facebook
      </div>
    ),
  },


];

export const previewItems = {
  github: <GitHubImage />,
  linkedin: <LinkedInImage />,
  youtube: <YoutubeImage />,
  twitter: <TwitterImage />,
  facebook: <FacebookImage />,

};

export const previewLinkColors = {
  github: 'bg-black',
  linkedin: 'bg-linkedin',
  youtube: 'bg-youtube',
  twitter: 'bg-twitter',
  facebook: 'bg-facebook',
};

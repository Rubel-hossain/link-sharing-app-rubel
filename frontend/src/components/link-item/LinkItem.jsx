/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaGripLines, FaLink } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { deleteLink } from '../../redux/features/linksSlice';

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px solid #ccc',
    '&:hover': {
      background: state.isFocused ? '#ccc' : '#fff',
    },
  }),
};

const LinkItem = ({
  _id,
  index,
  platform,
  link,
  options,
  links,
  updateLinks,
}) => {
  const [errorMsg, setErrorMsg] = useState('');

  const dispatch = useDispatch();
  const defaultValue = options.find(
    (item) => item.value.toLowerCase() === platform.toLowerCase()
  );

  return (
    <div className='p-5 bg-[#fafafa] rounded-md' key={_id}>
      <div className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <FaGripLines className='icon cursor-pointer' />
          <span className='link-count font-semibold'>Link #{index + 1}</span>
        </div>
        <button
          className='hover:underline'
          onClick={() => dispatch(deleteLink(_id))}
        >
          Remove
        </button>
      </div>
      <form className=''>
        <div className='my-4'>
          <label className='text-xs'>Platform</label>
          <Select
            options={options}
            defaultValue={defaultValue}
            className='active-focus'
            onChange={(selected) => {
              setErrorMsg('');
              const selectedValue = selected.value.toLowerCase();
              const existingPlatform = links.find(
                (link) =>
                  link.platform.toLowerCase() === selectedValue &&
                  defaultValue.value.toLowerCase() !== selectedValue
              );
              if (existingPlatform) {
                return setErrorMsg(
                  'Platform with the selected name already exist.'
                );
              } else {
                updateLinks({
                  _id,
                  key: 'platform',
                  value: selected.value,
                });
              }
            }}
            styles={customStyles}
          />
          {errorMsg && <p className='error-msg'>{errorMsg}</p>}
        </div>
        <div className='input-control'>
          <label className='text-xs'>Link</label>
          <div className='flex items-center border-2 border-gray-200 rounded-[4px] p-2 bg-white'>
            <FaLink />
            <input
              type='text'
              className='border-none ml-2 font-[18px] text-[#8d8c8c] bg-white focus:outline-none w-full'
              defaultValue={link}
              onChange={(event) =>
                updateLinks({
                  _id,
                  key: 'link',
                  value: event.target.value,
                })
              }
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LinkItem;

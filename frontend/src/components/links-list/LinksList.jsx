/* eslint-disable react/prop-types */
import { Reorder } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setLocalLinks } from '../../redux/features/linksSlice';
import { options } from '../../utils/constants';
import LinkItem from '../link-item/LinkItem';

const LinksList = ({ links }) => {
  const dispatch = useDispatch();

  const updateLocalLinks = ({ _id, key, value }) => {
    dispatch(
      setLocalLinks(
        links.map((link) => {
          if (link._id === _id) {
            return {
              ...link,
              [key]: value,
            };
          }
          return link;
        })
      )
    );
  };

  return (
    <div className='links-list-container'>
      <div className='mt-4 px-0 py-[10px] text-neutral-500 h-[500px] overflow-auto'>
        <Reorder.Group
          values={links}
          onReorder={(updatedList) => dispatch(setLocalLinks(updatedList))}
          className='flex flex-col gap-4'
        >
          {links.map((item, index) => {
            return (
              <Reorder.Item key={item._id} value={item}>
                <LinkItem
                  {...item}
                  index={index}
                  options={options}
                  links={links}
                  updateLinks={updateLocalLinks}
                />
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      </div>
    </div>
  );
};

export default LinksList;

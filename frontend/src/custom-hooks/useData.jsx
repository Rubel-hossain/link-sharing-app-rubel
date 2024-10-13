import { useContext } from 'react';
import DataContext from '../context/DataContext';

const useData = () => {
  const context = useContext(DataContext);

  if (typeof context === 'undefined') {
    throw new Error('Use DataContext Only Inside DataProvider');
  }

  return context;
};

export default useData;

import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (typeof context === 'undefined') {
    throw new Error('Use AuthContext Only Inside AuthProvider');
  }

  return context;
};

export default useAuth;

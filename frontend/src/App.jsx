import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/private-route/PrivateRoute';
import useAuth from './custom-hooks/useAuth';

const RegisterPage = React.lazy(() => import('./pages/register/RegisterPage'));
const LoginPage = React.lazy(() => import('./pages/login/LoginPage'));
const Profile = React.lazy(() => import('./pages/profile/Profile'));
const ProfilePreview = React.lazy(() =>
  import('./pages/preview/ProfilePreview')
);
const PublicProfilePreview = React.lazy(() =>
  import('./pages/preview/PublicProfilePreview')
);
const DashboardPage = React.lazy(() =>
  import('./pages/dashboard/DashboardPage')
);

const App = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <React.Suspense fallback={<p className='loading'>Loading...</p>}>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={
                isLoggedIn ? (
                  <Navigate to='/dashboard' />
                ) : (
                  <Navigate to='/login' />
                )
              }
            />
            <Route
              path='/login'
              element={!isLoggedIn ? <LoginPage /> : <Navigate to='/' />}
            />
            <Route
              path='/register'
              element={!isLoggedIn ? <RegisterPage /> : <Navigate to='/' />}
            />
            <Route path='/:profileId' element={<PublicProfilePreview />} />
            <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
              <Route path='/dashboard' element={<DashboardPage />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/preview' element={<ProfilePreview />} />
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </BrowserRouter>
      </React.Suspense>
      <ToastContainer
        position='bottom-right'
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme='dark'
      />
    </>
  );
};

export default App;

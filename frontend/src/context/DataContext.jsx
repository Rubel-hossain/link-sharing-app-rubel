import React, { useState } from 'react';

const DataContext = React.createContext();

export default DataContext;

export const DataProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [profileData, setProfileData] = useState(null);

  const updateProfileData = (data) => {
    setProfileData(data);
  };

  const updateProfileImage = (image) => {
    setProfileImage(image);
  };

  return (
    <DataContext.Provider
      value={{
        profileImage,
        updateProfileImage,
        profileData,
        updateProfileData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

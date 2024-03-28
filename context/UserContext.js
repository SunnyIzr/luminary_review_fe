import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserData = () => useContext(UserContext);

export const UserDataProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [accessibleTiers, setAccessibleTiers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  return (
    <UserContext.Provider value={{ userName, setUserName, accessibleTiers, setAccessibleTiers, isLoggedIn, setIsLoggedIn, lastName, setLastName, email, setEmail }}>
      {children}
    </UserContext.Provider>
  );
};

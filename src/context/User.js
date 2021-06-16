import React from 'react';
import { useState, createContext } from 'react';

const UserContext = createContext({
  inUser: false,
  dispatch: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const dispatch = ({ email, uid }) => {
    setUser({ email, uid });
  };
  const value = { user, dispatch };
  return (
    <UserContext.Provider value={value} >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider }
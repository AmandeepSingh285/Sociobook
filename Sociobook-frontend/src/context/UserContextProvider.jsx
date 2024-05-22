import React, { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [id, setId] = useState(null);
  const [token, setToken] = useState(null);
  const [homeReload, setHomeReload] = useState(false);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        id,
        setId,
        token,
        setToken,
        homeReload,
        setHomeReload,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

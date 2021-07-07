import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLoginHandler: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(JSON.parse(localStorage.getItem("isloggedIn")));
  }, []);

  const onLoginHandler = (value) => {
    localStorage.setItem("isloggedIn", value);
    setIsLoggedIn(value);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onLoginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

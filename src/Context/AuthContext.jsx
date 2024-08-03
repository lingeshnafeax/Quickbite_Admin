import { createContext,useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const context_values = {
    loggedIn,
    setLoggedIn,
  };
  
  return (
    <AuthContext.Provider value={context_values}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;

import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const GlobalContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => useContext(GlobalContext);

export default function GlobalProvider({ children }) {
  const [isLoginWithQR, setIsLoginWithQR] = useState(true);
  const [isLoginWithPhone, setIsLoginWithPhone] = useState(false);

  // Socket connection
  const [socketConnection, setSocketConnection] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        isLoginWithQR,
        setIsLoginWithQR,
        isLoginWithPhone,
        setIsLoginWithPhone,
        socketConnection,
        setSocketConnection,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

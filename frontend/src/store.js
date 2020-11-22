import React, { useContext } from 'react';
import PropTypes from 'prop-types';

const StoreContext = React.createContext(null);

export const useStoreContext = () => useContext(StoreContext);

function StoreProvider({ children }) {
  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('token'));

  const store = {
    loggedIn: [loggedIn, setLoggedIn],
  };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

StoreProvider.propTypes = {
  children: PropTypes.string.isRequired,
};

export default StoreProvider;

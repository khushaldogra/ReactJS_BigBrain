import React from 'react';
import PropTypes from 'prop-types';

export const StoreContext = React.createContext(null);

function StoreProvider({ children }) {
  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('token'));

  const store = {
    loggedIn: [loggedIn, setLoggedIn]
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

StoreProvider.propTypes = {
  children: PropTypes.any,
}

export default StoreProvider;
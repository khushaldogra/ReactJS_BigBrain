import React from 'react';
import { useHistory } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import config from '../config';
import BigBrainMenu from '../styledComponents/Menu';
import { useStoreContext } from '../store';

function NavBar() {
  const history = useHistory();
  const context = useStoreContext();
  // eslint-disable-next-line
  const [loggedIn, setIsLoggedIn] = context.loggedIn;

  const handleLogout = () => {
    // call API to logout
    fetch(`${config.basePath}/admin/auth/logout`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw Error(data.error);
        }
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        // redirect to landing page
        history.push('/');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <BigBrainMenu>
      <Menu.Item
        onClick={() => { history.push('/'); }}
      >
        Home
      </Menu.Item>
      <Menu.Item
        onClick={() => { history.push('/game/join'); }}
      >
        Join Game
      </Menu.Item>
      {!loggedIn
        ? (
          <>
            <Menu.Item
              onClick={() => { history.push('/login'); }}
            >
              Login
            </Menu.Item>
            <Menu.Item
              onClick={() => { history.push('/register'); }}
            >
              Register
            </Menu.Item>
          </>
        )
        : (
          <>
            <Menu.Item
              onClick={() => { history.push('/dashboard'); }}
            >
              Dashboard
            </Menu.Item>
            <Menu.Item
              onClick={handleLogout}
            >
              Logout
            </Menu.Item>
          </>
        )}
    </BigBrainMenu>
  );
}

export default NavBar;

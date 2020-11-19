import React, { useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import config from '../config';
import { BigBrainMenu } from '../styledComponents/Menu';
import { StoreContext } from '../store';

// change name to header
function Header() {
  const history = useHistory();
  const context = useContext(StoreContext);
  const [loggedIn, setIsLoggedIn] = context.loggedIn;

  const handleLogout = () => {
    // call API to logout
    fetch(config.basePath + '/admin/auth/logout', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage["token"]
      },
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        if (data.error) {
          throw Error(data.error);
        }
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        //redirect to landing page
        history.push('/')
      })
      .catch(err => {
        alert(err.message)
      })
  }

  // useEffect(() => {

  // }, [loggedIn]);

  return (
    <BigBrainMenu>
      <Link to="/">
        <Menu.Item>
          Home
        </Menu.Item>
      </Link>
      <Link to="/game/join">
        <Menu.Item>
          Join Game
        </Menu.Item>
      </Link>
      {!loggedIn ?
        <>
          <Link to="/login">
            <Menu.Item>
              Login
            </Menu.Item>
          </Link>
          <Link to="/register">
            <Menu.Item>
              Register
            </Menu.Item>
          </Link>
        </>
        :
        <>
          <Link to="/dashboard">
            <Menu.Item>
              Dashboard
          </Menu.Item>
          </Link>
          <Menu.Item
            onClick={handleLogout}
          >
            Logout
        </Menu.Item>
        </>
      }
    </BigBrainMenu>
  )
}

export default Header;
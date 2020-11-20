import React, { useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Menu, Button } from 'semantic-ui-react';
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

  return (
  <BigBrainMenu
    // widths={4}
  >
      <Menu.Item
        onClick={() => {history.push('/')}}
      >
        <Button>Home</Button>
      </Menu.Item>
      <Menu.Item
        onClick={() => {history.push('/game/join')}}
      >
        <Button>Join Game</Button>
      </Menu.Item>
      {!loggedIn ?
        <>
          <Menu.Item
            onClick={() => {history.push('/login')}}
          >
            <Button>Login</Button>
          </Menu.Item>
          <Menu.Item
            onClick={() => {history.push('/register')}}
          >
            <Button>Register</Button>
          </Menu.Item>
        </>
        :
        <>
          <Menu.Item
            onClick={() => {history.push('/dashboard')}}
          >
            <Button>Dashboard</Button>
          </Menu.Item>
            <Menu.Item 
              onClick={handleLogout}
            >
              <Button>Logout</Button>
            </Menu.Item>
        </>
      }
    </BigBrainMenu>
  )
}

export default Header;
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Button, Menu } from 'semantic-ui-react';
import config from '../config'

// change name to header
function Header() {
  const location = useLocation()
  const history = useHistory()
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage["token"]);
  // const [activeItem, setActiveItem] = useState("");

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
        localStorage.removeItem("token")
        //redirect to landing page
        history.push('/')
      })
      .catch(err => {
        alert(err.message)
      })

  }

  useEffect(() => {
    setIsLoggedIn(!!localStorage["token"])
  }, [location])

  return (
    <Menu>
      <Link to="/">
        <Menu.Item>
          Home
        </Menu.Item>
      </Link>
      <Link to="/dashboard">
        <Menu.Item>
          Dashboard
        </Menu.Item>
      </Link>
      {!isLoggedIn ?
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
        <Menu.Item
          onClick={handleLogout}
        >
          Logout
        </Menu.Item>
      }
    </Menu>
  )
}

/* <ul>
      <li>
        <Link to="/">
          Landing
                </Link>
      </li>
      <li>
        <Link to="/dashboard">
          Dashboard
                </Link>
      </li>
      <li>
        <Link to="/results/:id">
          Results
                </Link>
      </li>
      {!isLoggedIn ?
        <>
          <li>
            <Link to="/login">
              Login
                </Link>
          </li>
          <li>
            <Link to="/register">
              Register
                </Link>
          </li>
        </>
        :
        <li>
          <Button onClick={handleLogout}>Logout</Button>
        </li>
      }
    </ul> */

export default Header;
import React, { useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import { useHistory, useLocation } from 'react-router-dom';

const Homepage = () => {
    const history = useHistory()
    const location = useLocation()

    // stop logged out user from accessing home page
    useEffect(() => {
        if (!localStorage["token"]) {
            // alert("Invalid token")
            history.push('/')
        }
    },[location])

    return (
        <div>
            Home page
            <div><Button content='Logout' primary onClick={() => history.push('/login')}/></div>
        </div>
    )
}

export default Homepage;

// landing page - login - home/dashboard - pages
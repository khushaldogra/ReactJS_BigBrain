import React from 'react'
import { Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom';

const Homepage = () => {
    const history = useHistory()
    return (
        <div>
            Home page
            <div><Button content='Logout' primary onClick={() => history.push('/login')}/></div>
        </div>
    )
}

export default Homepage;
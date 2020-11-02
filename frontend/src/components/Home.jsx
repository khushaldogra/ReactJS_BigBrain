import React from 'react';
import { Button } from 'semantic-ui-react'
import {useHistory} from 'react-router-dom';

const Landing = () => {
    const history = useHistory()
    return(
        <div>
            Home page
            {/* <div><Button content='Login' primary onClick={() => history.push('/login')}/></div> */}
        </div>
    )
}
export default Landing;
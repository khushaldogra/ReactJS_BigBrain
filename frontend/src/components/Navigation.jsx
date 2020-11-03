import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        // Links to the path
        <ul>
            <li>
                <Link to="/">
                    Landing
                </Link>
            </li>
            <li>
                <Link to="/home">
                    Home
                </Link>
            </li>
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
        </ul>
    )
}

export default Navigation;
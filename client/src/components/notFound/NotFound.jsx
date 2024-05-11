import './NotFound.css';
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {

    
    return (
        <>
            <div className="not-found-ctr">
                <h1>404</h1>
                <div className='upper'>
                    <h2>Page not found!</h2>
                </div>
                <div className='lower'>
                    <Link to={'/'} className='btn'>Home page</Link>
                </div>
            </div>
        </>
    )
}

export default NotFound;
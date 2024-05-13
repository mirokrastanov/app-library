import React from 'react';
import './PageLoader.css';
import Spinner from '../spinner/Spinner';

export default function PageLoader() {
    return (
        <div className='page-loader-cage'>
            <Spinner />
        </div>
    )
}
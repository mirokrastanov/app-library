import { Link } from 'react-router-dom';
import './Home.css';
import React from 'react';
import AppCard from '../appCard/AppCard';

function Home() {
    return (
        <div className='home-ctr'>
            <h1 id='top'>Large Projects</h1>
            <div className="cards-cage">
                <AppCard />

                <Link className='btn' to={'/rps'}>RPS TEST LINK</Link>
            </div>
            <h1>Small Projects</h1>
            <div className="cards-cage">
                <AppCard />

            </div>
        </div>
    )
}

export default Home;

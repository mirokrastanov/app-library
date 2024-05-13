import { Link } from 'react-router-dom';
import './Home.css';
import React from 'react';
import AppCard from '../appCard/AppCard';

function Home() {
    return (
        <div className='home-ctr'>
            <h1 id='top'>Large Projects</h1>
            <div className="cards-cage">
                <AppCard id={10} />
                <AppCard id={11} />
                <AppCard id={12} />
                <AppCard id={13} />
            </div>
            <h1>Small Projects</h1>
            <div className="cards-cage">
                <AppCard id={1} />
                <AppCard id={2} />
                <AppCard id={3} />
                <AppCard id={4} />
                <AppCard id={5} />
                <AppCard id={6} />
                <AppCard id={7} />
                <AppCard id={8} />
                <AppCard id={9} />
            </div>
        </div>
    )
}

export default Home;

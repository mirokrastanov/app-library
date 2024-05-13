import { Link } from 'react-router-dom';
import './Home.css';
import React from 'react';
import AppCard from '../appCard/AppCard';

function Home() {
    return (
        <div className='home-ctr'>
            <section className='h--section-top'>
                <h1 className='h--title'>Apps & Games</h1>
                <div className="h--content">
                    <AppCard />
                    {/* <Link className='btn' to={'/shows'}>Shows</Link> */}
                </div>
            </section>
        </div>
    )
}

export default Home;
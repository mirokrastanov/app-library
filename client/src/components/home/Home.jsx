import { Link } from 'react-router-dom';
import './Home.css';
import React from 'react';

function Home() {
    return (
        <div className='home-ctr'>
            <section className='h--section-top'>
                <h1 className='h--title'>Apps & Games</h1>
                <div className="h--content">
                    <div className="h--info">
                        <p>APP CARDS BELOW...</p>
                        {/* <Link className='btn' to={'/shows'}>Shows</Link> */}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;
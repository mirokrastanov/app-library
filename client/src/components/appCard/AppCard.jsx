import React from 'react';
import './AppCard.css';
import TechImg from '../shared/techImg/TechImg';

function AppCard({ appName, appPoster, appType, techArr, appInfo }) {
    return (
        <div className="card">
            <div className="poster">
                <img src="https://raw.githubusercontent.com/mirokrastanov/Software-Engineering-SoftUni/main/miscellaneous/rock-paper-scissors.jfif" alt="card-poster" />
            </div>
            <div className="details">
                <div className='title-ctr'><h2>Rock - Paper - Scissors</h2></div>
                <span className='app-type'>Web Game</span>
                <div className="tags">
                    <TechImg techName={'HTML'} />
                    <TechImg techName={'CSS'} />
                    <TechImg techName={'JavaScript'} />
                </div>
                <div className="info">
                    <p>Summary === Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti adipisci inventore eveniet hic voluptas quaerat distinctio alias nesciunt esse doloribus?</p>
                </div>
                <div className="extra">
                    <p>Read more</p>
                    <span className="material-symbols-outlined">
                        chevron_right
                    </span>
                </div>
            </div>
        </div>
    )
}

export default AppCard;
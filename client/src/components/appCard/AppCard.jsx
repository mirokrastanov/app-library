import React from 'react';
import './AppCard.css';
import TechImg from '../shared/techImg/TechImg';

function AppCard({ appImg, appName, appType, techArr, appInfo }) {
    return (
        <div className="card">
            <div className="poster">
                <img src="" alt="card-poster" />
            </div>
            <div className="details">
                <div className='title-ctr'><h2>Card Title</h2></div>
                <span className='app-type'>Web Game</span>
                <div className="tags">
                    <TechImg techName={'HTML'} />
                    <TechImg techName={'CSS'} />
                    <TechImg techName={'JavaScript'} />
                    <TechImg techName={'TypeScript'} />
                    <TechImg techName={'React'} />
                    <TechImg techName={'Angular'} />
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
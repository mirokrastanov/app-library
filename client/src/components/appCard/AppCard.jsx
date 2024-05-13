import './AppCard.css';
import React, { useEffect, useState } from 'react';
import TechImg from '../shared/techImg/TechImg';
import { appData } from '../../util/assets';

function AppCard({ id }) {
    // 1 - 9 small | 10 - 13 large
    //    <Link className='btn' to={'/details/1'}>RPS TEST LINK</Link> 
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        // console.log(id);
        setData(appData.find(x => x.id === id));
        setLoading(true);
    }, [])
   
    useEffect(() => {
        // console.log(data);
        if (data !== null && data !== undefined) {
            setLoading(false);
        } else {
            setLoading(true);
        }

    }, [data])


    return (
        <div className="card">
            <div className="poster">
                <img src={data.appPoster} alt="card-poster" />
            </div>
            <div className="details">
                <div className='title-ctr'><h2>{data.appName}</h2></div>
                <span className='app-type'>{data.appType}</span>
                <div className="tags">
                    {data.techArr.slice(0,5).map(techItem => <TechImg techName={techItem}/>)}
                </div>
                <div className="info">
                    <p>{data.appInfo}</p>
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
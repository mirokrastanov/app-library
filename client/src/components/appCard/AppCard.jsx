import './AppCard.css';
import React, { useEffect, useState } from 'react';
import TechImg from '../shared/techImg/TechImg';
import { appData } from '../../util/assets';
import { useNavigate } from 'react-router-dom';
import CardLoader from '../shared/cardLoader/CardLoader';

function AppCard({ id }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const clickHandler = (e) => {
        const appId = e.currentTarget.dataset.id;
        // console.log('clicked', id);

        navigate(`/details/${appId}`);
    };

    useEffect(() => {
        // console.log(id);
        setData(appData.find(x => x.id === id));
    }, [id])

    useEffect(() => {
        // console.log(data);
        if (data !== null && data !== undefined) {
            setLoading(false);
        }
    }, [data])


    return (<>
        {loading
            ? (<div className="card"><CardLoader /></div>)
            : (<div className="card" data-id={data.id} onClick={clickHandler}>
                <div className="poster">
                    <img src={data.appPoster} alt="card-poster" />
                </div>
                <div className="details">
                    <div className='title-ctr'><h2>{data.appName}</h2></div>
                    <span className='app-type'>{data.appType}</span>
                    <div className="tags">
                        {data.techArr.slice(0, 5).map((techItem, i) => (
                            <TechImg techName={techItem} key={i + 'techArr--' + techItem} />
                        ))}
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
            </div>)
        }
    </>)
}

export default AppCard;
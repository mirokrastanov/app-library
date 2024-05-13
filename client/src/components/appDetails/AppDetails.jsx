import './AppDetails.css';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TechImg from '../shared/techImg/TechImg';
import { appData } from '../../util/assets';
import PageLoader from '../shared/pageLoader/PageLoader';

function AppDetails() {
    // grab route param id
    // 1 - 9 small | 10 - 13 large
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // console.log(id);
        setData(appData.find(x => x.id == id));
    }, [id]);

    useEffect(() => {
        // console.log(data);
        if (data !== null && data !== undefined) {
            setLoading(false);
        }
    }, [data]);

    return (
        <div className='app-details-ctr'>
            {loading
                ? (<>
                    <h1>App Details</h1>
                    <PageLoader />
                </>)
                : (<>
                    <h1>{data.appName}</h1>
                    <h2>{data.appType}</h2>
                    <div className='card-cage' data-id={data.id}>
                        <div className="details-info">
                            <p>{data.appInfo}</p>
                        </div>
                            <h2>Tech Stack</h2>
                        <div className="details-tech tags">
                            {data.techArr.map((techItem, i) => (
                                <TechImg techName={techItem} key={i + 'techArr--' + techItem} />
                            ))}
                        </div>
                        <h2>More Options</h2>
                        <div className="details-btns">
                            <Link to={'/'} className='btn btn-home'>Home</Link>
                            <Link to={'/'} className='btn'>Docs</Link>
                            <Link to={'/'} className='btn'>Source Code</Link>
                            <Link to={'/'} className='btn btn-demo'>Try Demo</Link>
                            {/* FIX LINKS - gen master object with URLs etc */}
                        </div>
                    </div>
                </>)
            }
        </div>
    )
}

export default AppDetails;
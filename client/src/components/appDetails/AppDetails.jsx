import './AppDetails.css';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TechImg from '../shared/techImg/TechImg';
import { appData } from '../../util/assets';
import PageLoader from '../shared/pageLoader/PageLoader';

function AppDetails() {
    // 1 - 9 small | 10 - 13 large
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalURL, setModalURL] = useState('');

    useEffect(() => {
        window.addEventListener('click', backdropCloseModal);
        return () => {
            window.removeEventListener('click', backdropCloseModal);
        };
    }, [])

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

    function openModal(e) {
        // console.log(e.target.src);
        setModalURL(e.target.src);
        setModalOpen(true);
    }

    function closeModal(e) {
        setModalOpen(false);
    }

    function backdropCloseModal(e) {
        if (e.target.classList.contains('modal')) {
            setModalOpen(false);
        }
    }

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
                    <div className="cards-cage app-images">
                        <article className='tooltip-anchor'>
                            <img src={data.appPoster} alt="img" onClick={openModal} />
                            <div className='tooltip'>View in full size</div>
                        </article>
                        <article className='tooltip-anchor'>
                            <img src="https://github.com/mirokrastanov/Responsive-Weather-Application/raw/main/src/images/github-doc/w14.png?raw=true" alt="img" onClick={openModal} />
                            <div className='tooltip'>View in full size</div>
                        </article>
                    </div>
                    <div id="app-modal" className={`modal${modalOpen ? ' modal-open' : ''}`}>
                        <div className="modal-content">
                            <img src={modalURL} alt="img" onClick={closeModal} className='tooltip-anchor' />
                            <div className='tooltip'>Close</div>
                        </div>
                    </div>
                </>)
            }
        </div>
    )
}

export default AppDetails;
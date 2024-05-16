import './AppDetails.css';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TechImg from '../shared/techImg/TechImg';
import { appData } from '../../util/assets';
import PageLoader from '../shared/pageLoader/PageLoader';
import PreviewImg from '../shared/previewImg/PreviewImg';

function AppDetails() {
    // 1 - 9 small | 10 - 13 large
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalURL, setModalURL] = useState('');

    useEffect(() => {
        if (modalURL == '') setModalOpen(false);

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
            // console.log(data.extDemoURL ?? data.intDemoURL);
        }
    }, [data]);

    useEffect(() => {
        if (modalURL == '') setModalOpen(false);
    }, [modalURL])

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
                            {data.notes
                                ? (<div className="red">
                                    {data.notes.map((n, ind) => <p key={ind + '-note-' + data.id}>{n}</p>)}
                                </div>)
                                : (<></>)}
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
                            <Link to={data.docsURL} target='_blank' className='btn'>Docs</Link>
                            <Link to={data.sourceCodeURL} target='_blank' className='btn'>Source Code</Link>
                            <Link to={data.extDemoURL ?? data.intDemoURL} className='btn btn-demo'
                                target={data.extDemoURL ? '_blank' : ''} >Try Demo</Link>
                        </div>
                    </div>
                    <div className="cards-cage app-images">
                        <PreviewImg src={data.appPoster} onClick={openModal} />
                        {data.imgArr.map((img, imgIndex) => (
                            <PreviewImg key={imgIndex + '--' + 'img-prev'} src={img} onClick={openModal} />
                        ))}
                    </div>
                    <div id="app-modal" className={`modal${modalOpen ? ' modal-open' : ''}`}>
                        <div className="modal-content">
                            <img src={modalURL} alt="img" onClick={closeModal} />
                            <Link to={modalURL} target='_blank' className='tooltip-anchor'>
                                <span className="material-symbols-outlined open-in-new">
                                    open_in_new
                                </span>
                                <div className='tooltip'>Full Size</div>
                            </Link>
                        </div>
                    </div>
                </>)
            }
        </div>
    )
}

export default AppDetails;
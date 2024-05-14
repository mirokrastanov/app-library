import React from 'react';

function PreviewImg({ src, onClick }) {

    if (src && src != '') return (
        <article className='tooltip-anchor'>
            <img src={src} alt="img" onClick={onClick} />
            <div className='tooltip'>View image</div>
        </article>
    )
    return (<></>)
}

export default PreviewImg;
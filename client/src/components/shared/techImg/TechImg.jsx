import React from 'react';
import { techImgUrls } from '../../../util/assets';

function TechImg({ techName }) {
    return (
        <img src={techImgUrls[techName]} alt={techName} height='40px' title={techName} />
    )
}

export default TechImg;